import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Script from 'next/script'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import './globals.css'
import { cn } from "@/lib/utils";

// 1. Оптимизация загрузки шрифта на уровне сервера
const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

// 2. Строгая типизация глобальных метаданных сайта
export const metadata: Metadata = {
  title: {
    default: 'ЛДЦ «Здоровая Семья» | Медицинский центр в Пензе и Заречном',
    template: '%s | ЛДЦ Здоровая Семья'
  },
  description: 'Приём невролога, мануального терапевта, комплексная лабораторная диагностика. 4 современных отделения. Удобная запись онлайн.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={cn("scroll-smooth", "font-sans", geist.variable)}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-background text-foreground">
        
        {/* Шапка сайта */}
        <header className="bg-card/95 backdrop-blur border-b sticky top-0 z-50 transition-all">
          <div className="container mx-auto flex items-center justify-between h-16 px-4">
            <Link 
              href="/" 
              className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-teal-600 dark:from-blue-400 dark:to-teal-400 bg-clip-text text-transparent tracking-tight"
            >
              Здоровая Семья
            </Link>
            
            <nav className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Главная
              </Link>
              <Link href="/contacts" className="text-muted-foreground hover:text-foreground transition-colors">
                Контакты
              </Link>
              
              {/* Используем кнопку из нашего shadcn/ui стека */}
              <Button asChild size="sm" className="hidden sm:inline-flex">
                <Link href="/appointment">Запись</Link>
              </Button>

              {/* Элемент кнопки виджета Medflex в навигации */}
              <div 
                id="medflexMedtochkaWidgetButton" 
                data-src="https://booking.medflex.ru/?user=38061275f1134bb6bb688d741b213f45"
                className="cursor-pointer"
              ></div>
            </nav>
          </div>
        </header>

        {/* Основной контент страницы */}
        <main className="flex-1 bg-background">
          {children}
        </main>

        {/* Подвал сайта */}
        <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8">
          <div className="container mx-auto grid gap-8 px-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="space-y-3">
              <h3 className="text-slate-100 text-lg font-bold tracking-tight">ЛДЦ «Здоровая Семья»</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                Профессиональная медицинская помощь и экспертная диагностика для всей семьи. Работаем на благо вашего здоровья с 2014 года.
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <h4 className="text-slate-100 font-semibold tracking-wide">Контакты</h4>
              <p className="flex items-center gap-2">📞 <span className="font-mono">8 (841-2) 99-58-01</span></p>
              <p className="flex items-center gap-2">✉️ <span className="font-mono">ldc-zs@mail.ru</span></p>
              <p>📍 4 отделения в Пензе и Заречном</p>
            </div>
            <div className="space-y-2 text-sm">
              <h4 className="text-slate-100 font-semibold tracking-wide">Режим работы</h4>
              <p>Пн–Сб: <span className="text-slate-200">8:00 – 20:00</span></p>
              <p>Вс: <span className="text-slate-500">по предварительной записи</span></p>
            </div>
          </div>
          
          {/* ИСПРАВЛЕНО: Теперь тег корректно открывается и закрывается как <div> */}
          <div className="container mx-auto text-center text-xs text-slate-600 pt-8 border-t border-slate-900/60 mt-12 px-4">
            © {new Date().getFullYear()} ЛДЦ «Здоровая Семья». Все права защищены. По закону РФ данные не являются публичной офертой.
          </div>
        </footer>

        {/* Данные круглого виджета Medflex */}
        <div 
          id="medflexRoundWidgetData" 
          data-src="https://booking.medflex.ru/?user=38061275f1134bb6bb688d741b213f45&isRoundWidget=true"
        ></div>

        {/* 3. Асинхронная отложенная загрузка тяжелых внешних скриптов без блокировки основного потока */}
        <Script 
          src="https://booking.medflex.ru/components/round/round_widget_button.js" 
          strategy="lazyOnload" 
          charSet="utf-8"
        />
        <Script 
          src="https://booking.medflex.ru/components/medtochka-button/medtochka-widget-button.js" 
          strategy="lazyOnload" 
          charSet="utf-8"
        />
      </body>
    </html>
  )
}