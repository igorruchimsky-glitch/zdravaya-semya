import './globals.css'
import Script from 'next/script' // Импортируем безопасный загрузчик скриптов

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="antialiased text-slate-900 bg-background">
        
        {children}

        {/* --- ВИДЖЕТЫ ЗАПИСИ MEDFLEX & МЕДТОЧКА --- */}
        {/* Контейнер для круглой кнопки записи */}
        <div 
          id="medflexRoundWidgetData"
          data-src="https://booking.medflex.ru/?user=38061275f1134bb6bb688d741b213f45&isRoundWidget=true"
        ></div>
        <Script 
          src="https://booking.medflex.ru/components/round/round_widget_button.js" 
          strategy="lazyOnload"
          charset="utf-8"
        />

        {/* Контейнер для кнопки Вход в МедТочку */}
        <div 
          id="medflexMedtochkaWidgetButton"
          data-src="https://booking.medflex.ru/?user=38061275f1134bb6bb688d741b213f45"
        ></div>
        <Script 
          src="https://booking.medflex.ru/components/medtochka-button/medtochka-widget-button.js" 
          strategy="lazyOnload"
          charset="utf-8"
        />
      </body>
    </html>
  )
}