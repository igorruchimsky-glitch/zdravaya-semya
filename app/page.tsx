import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Shield, Activity, Stethoscope, MapPin, Award, Calendar } from 'lucide-react'

// Описание интерфейса для филиалов из Supabase
interface Branch {
  id: number
  name: string
  address: string
  phone: string
  working_hours: string
}

// Глобальное SEO для главной страницы
export const metadata: Metadata = {
  title: 'ЛДЦ «Здоровая Семья» | Медицинский центр в Пензе и Заречном',
  description: 'Приём невролога, мануального терапевта, комплексная лабораторная диагностика (партнер Гемотест). 4 отделения. Удобная онлайн-запись.',
}

// Статичные массивы данных для моментального рендеринга
const services = [
  { title: 'Приём невролога', desc: 'Квалифицированная диагностика и лечение заболеваний центральной и периферической нервной системы.', icon: Brain },
  { title: 'Мануальная терапия', desc: 'Безопасное восстановление функций опорно-двигательного аппарата и суставов.', icon: Activity },
  { title: 'Лабораторная диагностика', desc: 'Более 3000 видов медицинских анализов экспертного уровня в партнерстве с Гемотест.', icon: Shield },
  { title: 'Консультация терапевта', desc: 'Первичный приём, комплексный осмотр, постановка диагноза и назначение схемы лечения.', icon: Stethoscope },
]

const advantages = [
  { title: '4 филиала', desc: 'Удобно расположены в Пензе и Заречном', icon: MapPin },
  { title: 'Экспертный уровень', desc: 'Современное диагностическое оборудование', icon: Shield },
  { title: 'Опытные врачи', desc: 'Специалисты высшей квалификационной категории', icon: Award },
  { title: 'Запись онлайн', desc: 'Быстрое бронирование времени 24/7', icon: Calendar },
]

const doctors = [
  { name: 'Ручимский Игорь Николаевич', spec: 'Врач-невролог, мануальный терапевт', exp: 'Стаж более 15 лет' },
  { name: 'Ручимская Елена Евгеньевна', spec: 'Врач-терапевт', exp: 'Стаж более 12 лет' },
]

export default function Home() {
  return (
    <div className="space-y-20 pb-16">
      {/* 1. Блок HERO (Первый экран) */}
      <section className="relative bg-gradient-to-r from-blue-700 to-teal-600 text-white py-24 sm:py-32">
        <div className="container mx-auto px-4 text-center space-y-6 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Лечебно-диагностический центр<br />«Здоровая Семья»
          </h1>
          <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto font-normal leading-relaxed">
            Профессиональная медицинская помощь для всей семьи в Пензенской области. Комплексная диагностика, индивидуальный подход и забота о вашем здоровье.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button asChild size="lg" variant="secondary" className="font-semibold shadow-md">
              <Link href="/appointment">Записаться на приём</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 font-semibold">
              <Link href="/contacts">Наши отделения</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Блок МЕДИЦИНСКИЕ УСЛУГИ */}
      <section className="container mx-auto px-4 max-w-6xl space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Наши услуги</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Основные направления лечебной и diagnostic деятельности центра</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <Card key={i} className="text-center transition-all hover:shadow-md border-muted">
                <CardHeader className="flex justify-center pt-6">
                  <div className="mx-auto rounded-full bg-blue-50 p-3 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                    <Icon className="h-8 w-8" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CardTitle className="text-lg font-bold">{s.title}</CardTitle>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* 3. Блок ПРЕИМУЩЕСТВА */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-16">
        <div className="container mx-auto px-4 max-w-6xl space-y-8">
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">Почему выбирают нас</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {advantages.map((a, i) => {
              const Icon = a.icon
              return (
                <div key={i} className="space-y-3 p-4">
                  <div className="flex justify-center text-teal-600 dark:text-teal-400">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">{a.title}</h3>
                  <p className="text-muted-foreground text-sm">{a.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. Блок НАШИ ВРАЧИ */}
      <section className="container mx-auto px-4 max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Наши специалисты</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Врачи высшей категории с многолетним опытом практической работы</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {doctors.map((d, i) => (
            <Card key={i} className="flex items-center p-5 space-x-4 border-muted hover:shadow-sm transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center shrink-0 shadow-inner">
                <span className="text-white text-xl font-bold">🩺</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold leading-tight">{d.name}</h3>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{d.spec}</p>
                <p className="text-xs text-muted-foreground">{d.exp}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. Блок ФИЛИАЛЫ И ОТДЕЛЕНИЯ */}
      <section className="container mx-auto px-4 max-w-6xl space-y-8">
        <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">Наши отделения</h2>
        <Suspense fallback={<div className="text-center py-12 text-muted-foreground text-sm">Загрузка информации о филиалах...</div>}>
          <BranchesGrid />
        </Suspense>
      </section>
    </div>
  )
}

// Изолированный серверный компонент для загрузки данных из Supabase
async function BranchesGrid() {
  try {
    const { data, error } = await supabase
      .from('branches')
      .select('id, name, address, phone, working_hours')

    if (error || !data || data.length === 0) {
      throw new Error('Data empty')
    }

    // Принудительно приводим к нашему строгому типу данных
    const branches = data as Branch[]

    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {branches.map((b: Branch) => (
          <Card key={b.id} className="border-muted bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold text-primary">{b.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <p className="text-foreground font-medium">{b.address}</p>
              <p className="pt-1 font-mono text-foreground font-semibold">📞 {b.phone}</p>
              <p>🕒 {b.working_hours}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  } catch (err) {
    return (
      <div className="text-center p-6 border rounded-lg bg-muted/20 text-sm text-muted-foreground">
        Информация об отделениях временно недоступна. Пожалуйста, обратитесь по телефону клиники.
      </div>
    )
  }
}