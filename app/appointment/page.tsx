import { Metadata } from 'next'
import AppointmentForm from '@/components/AppointmentForm'
import { Toaster } from 'react-hot-toast'

// Статическое SEO продвижение страницы записи. 
// Поисковые роботы увидят эти теги до загрузки клиентского JavaScript.
export const metadata: Metadata = {
  title: 'Онлайн-запись к врачу | Медицинский центр Здоровая Семья',
  description: 'Удобная онлайн-запись на прием к специалистам медицинского центра «Здоровая Семья» в Заречном и Пензе. Выберите удобное время и запишитесь в два клика.',
  openGraph: {
    title: 'Онлайн-запись к врачу | ЛДЦ Здоровая Семья',
    description: 'Запись на прием к врачу онлайн без очередей.',
    type: 'website',
  },
}

export default function AppointmentPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl min-h-[80vh] flex flex-col justify-center">
      <div className="space-y-2 text-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Запись на приём
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
          Заполните форму ниже, выберите удобное отделение и время. Мы свяжемся с вами для подтверждения.
        </p>
      </div>

      {/* Интерактивная клиентская форма */}
      <div className="bg-card text-card-foreground rounded-xl border shadow-sm p-6 sm:p-8">
        <AppointmentForm />
      </div>

      {/* Провайдер всплывающих уведомлений */}
      <Toaster 
        position="top-center" 
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }} 
      />
    </main>
  )
}