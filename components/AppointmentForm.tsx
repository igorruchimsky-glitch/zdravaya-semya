'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabaseClient'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Branch {
  id: number
  name: string
}

// Статичные списки для удобства пациентов
const doctorsList = [
  'Ручимский Игорь Николаевич (Невролог, мануальный терапевт)',
  'Карпина Наталья Юрьевна (Терапевт)',
  'Титоренко Анастасия Андреевна (Акушер-гинеколог, УЗД)',
  'Паршина Владислава Витальевна (Акушер-гинеколог, УЗД)',
  'Гришина Ирина Александровна (Эндокринолог)'
]

const servicesList = [
  'Приём невролога',
  'Мануальная терапия',
  'Лабораторная диагностика (Анализы)',
  'Консультация терапевта',
  'Акушерство и гинекология',
  'Эндокринология',
  'УЗИ диагностика'
]

const formSchema = z.object({
  patient_name: z.string().min(2, 'Минимум 2 символа').max(60),
  patient_phone: z.string().regex(/^\+?[78][-\s]?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/, {
    message: 'Формат: +7 (999) 123-45-67',
  }),
  preferred_date: z.string().min(1, 'Выберите желаемую дату'),
  branch_id: z.string().min(1, 'Выберите отделение'),
  doctor: z.string().min(1, 'Выберите специалиста'),
  service: z.string().min(1, 'Выберите направление'),
})

type FormValues = z.infer<typeof formSchema>

export default function AppointmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [branches, setBranches] = useState<Branch[]>([])
  const [isLoadingBranches, setIsLoadingBranches] = useState(true)
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      patient_name: '', 
      patient_phone: '', 
      preferred_date: '', 
      branch_id: '',
      doctor: '',
      service: ''
    },
  })

  useEffect(() => {
    async function loadBranches() {
      try {
        // Запрашиваем реальную таблицу и поля из вашей базы данных
        const { data, error } = await supabase.from('ветви').select('id, Имя').order('id')
        if (error) throw error
        if (data) {
          const formatted = data.map((b: any) => ({
            id: b.id,
            name: b.Имя || 'Отделение'
          }))
          setBranches(formatted)
        }
      } catch (err) {
        console.error('Ошибка чтения таблицы ветви:', err)
        // Резервный надежный вариант, если что-то пойдет не так
        setBranches([
          { id: 1, name: 'г. Заречный, ул. Проценко, стр. 15' },
          { id: 2, name: 'г. Пенза, ул. Тернопольская, д. 10' },
          { id: 3, name: 'г. Пенза, пр-кт Строителей, д. 174' },
          { id: 4, name: 'г. Пенза, ул. Измайлова, д. 58А' },
        ])
      } finally {
        setIsLoadingBranches(false)
      }
    }
    loadBranches()
  }, [])

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      const selectedBranch = branches.find((b) => b.id.toString() === data.branch_id)?.name || 'Не указано'

      // Формируем расширенное имя для администратора клиники
      const metaInfo = `[Врач: ${data.doctor} | Услуга: ${data.service}]`
      const fullPatientName = `${data.patient_name.trim()} ${metaInfo}`

      const { error: dbError } = await supabase.from('appointments').insert({
        patient_name: fullPatientName,
        patient_phone: data.patient_phone.trim(),
        preferred_date: data.preferred_date,
        branch_id: parseInt(data.branch_id),
        status: 'new'
      } as any)

      if (dbError) throw dbError

      // Отправляем расширенное уведомление в Telegram / Email через ваш API
      await fetch('/api/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_name: data.patient_name.trim(),
          patient_phone: data.patient_phone.trim(),
          preferred_date: data.preferred_date,
          branch_name: selectedBranch,
          doctor: data.doctor,
          service: data.service
        }),
      })

      toast.success('Заявка успешно отправлена!')
      form.reset()
      router.push('/thank-you')
    } catch (err) {
      console.error(err)
      toast.error('Ошибка при отправке заявки')
    } finally {
      setIsSubmitting(false)
    }
  }

  const todayStr = new Date().toISOString().split('T')[0]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 max-w-md mx-auto text-left">
        
        {/* Поле: Имя */}
        <FormField
          control={form.control}
          name="patient_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-slate-900 dark:text-white">Ваше имя и фамилия</FormLabel>
              <FormControl>
                <Input placeholder="Иванов Иван Иванович" {...field} disabled={isSubmitting} className="rounded-lg" />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        {/* Поле: Телефон */}
        <FormField
          control={form.control}
          name="patient_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-slate-900 dark:text-white">Номер телефона</FormLabel>
              <FormControl>
                <Input placeholder="+7 (999) 123-45-67" {...field} disabled={isSubmitting} className="rounded-lg" />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        {/* Новое поле: Выбор направления/услуги */}
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-slate-900 dark:text-white">Что вас интересует?</FormLabel>
              <Select disabled={isSubmitting} onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Выберите медицинское направление" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {servicesList.map((service, index) => (
                    <SelectItem key={index} value={service}>{service}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        {/* Новое поле: Выбор врача */}
        <FormField
          control={form.control}
          name="doctor"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-slate-900 dark:text-white">Специалист</FormLabel>
              <Select disabled={isSubmitting} onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Выберите врача" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {doctorsList.map((doc, index) => (
                    <SelectItem key={index} value={doc}>{doc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        {/* Поле: Медицинское отделение */}
        <FormField
          control={form.control}
          name="branch_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-slate-900 dark:text-white">Медицинское отделение</FormLabel>
              <Select disabled={isSubmitting || isLoadingBranches} onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder={isLoadingBranches ? "Загрузка филиалов..." : "Выберите адрес клиники"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {branches.map((b) => (
                    <SelectItem key={b.id} value={b.id.toString()}>{b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        {/* Поле: Желаемая дата */}
        <FormField
          control={form.control}
          name="preferred_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-slate-900 dark:text-white">Желаемая дата приёма</FormLabel>
              <FormControl>
                <Input type="date" min={todayStr} {...field} disabled={isSubmitting} className="rounded-lg" />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        {/* Кнопка отправки */}
        <Button type="submit" className="w-full font-bold bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-lg shadow-md transition-all" disabled={isSubmitting}>
          {isSubmitting ? 'Отправка заявки...' : 'Записаться на приём'}
        </Button>
      </form>
    </Form>
  )
}