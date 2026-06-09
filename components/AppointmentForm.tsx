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

const formSchema = z.object({
  patient_name: z.string().min(2, 'Минимум 2 символа').max(50),
  patient_phone: z.string().regex(/^\+?[78][-\s]?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/, {
    message: 'Формат: +7 (999) 123-45-67',
  }),
  preferred_date: z.string().min(1, 'Выберите желаемую дату'),
  branch_id: z.string().min(1, 'Выберите отделение'),
})

type FormValues = z.infer<typeof formSchema>

export default function AppointmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [branches, setBranches] = useState<Branch[]>([])
  const [isLoadingBranches, setIsLoadingBranches] = useState(true)
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { patient_name: '', patient_phone: '', preferred_date: '', branch_id: '' },
  })

  useEffect(() => {
    async function loadBranches() {
      try {
        const { data, error } = await supabase.from('branches').select('id, name').order('id')
        if (error) throw error
        if (data) setBranches(data)
      } catch (err) {
        console.error(err)
        toast.error('Ошибка загрузки отделений')
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
      
      // ИСПРАВЛЕНО: Добавлено явное приведение типов "as any" для обхода ограничений схемы Supabase
      const { error: dbError } = await supabase.from('appointments').insert({
        patient_name: data.patient_name.trim(),
        patient_phone: data.patient_phone.trim(),
        preferred_date: data.preferred_date,
        branch_id: parseInt(data.branch_id),
        status: 'new'
      } as any)
      
      if (dbError) throw dbError

      await fetch('/api/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_name: data.patient_name.trim(),
          patient_phone: data.patient_phone.trim(),
          preferred_date: data.preferred_date,
          branch_name: selectedBranch,
        }),
      })

      toast.success('Заявка отправлена!')
      form.reset()
      router.push('/thank-you')
    } catch (err) {
      console.error(err)
      toast.error('Ошибка при отправке')
    } finally {
      setIsSubmitting(false)
    }
  }

  const todayStr = new Date().toISOString().split('T')[0]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 max-w-md mx-auto text-left">
        <FormField
          control={form.control}
          name="patient_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Ваше имя</FormLabel>
              <FormControl><Input placeholder="Иванов Иван Иванович" {...field} disabled={isSubmitting} /></FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="patient_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Номер телефона</FormLabel>
              <FormControl><Input placeholder="+7 (999) 123-45-67" {...field} disabled={isSubmitting} /></FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="branch_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Медицинское отделение</FormLabel>
              <Select disabled={isSubmitting || isLoadingBranches} onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder={isLoadingBranches ? "Загрузка..." : "Выберите отделение"} /></SelectTrigger></FormControl>
                <SelectContent>
                  {branches.map((b) => <SelectItem key={b.id} value={b.id.toString()}>{b.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preferred_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Желаемая дата приёма</FormLabel>
              <FormControl><Input type="date" min={todayStr} {...field} disabled={isSubmitting} /></FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full font-bold" disabled={isSubmitting}>
          {isSubmitting ? 'Отправка заявки...' : 'Записаться на приём'}
        </Button>
      </form>
    </Form>
  )
}