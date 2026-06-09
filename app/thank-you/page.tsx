import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Успешная запись | ЛДЦ Здоровая Семья',
  description: 'Ваша заявка успешно принята. Мы свяжемся с вами в ближайшее время.',
}

export default function ThankYouPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-md text-center space-y-6">
      <div className="flex justify-center text-teal-600 dark:text-teal-400">
        <CheckCircle2 className="h-16 w-16" />
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight">Заявка принята!</h1>
      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
        Спасибо за доверие. Наш администратор уже получил уведомление и свяжется с вами в течение 15–30 минут для подтверждения даты и точного времени приёма.
      </p>
      <div className="pt-4">
        <Button asChild className="w-full font-semibold">
          <Link href="/">Вернуться на главную</Link>
        </Button>
      </div>
    </div>
  )
}