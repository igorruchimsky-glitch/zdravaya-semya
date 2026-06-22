import './globals.css'
import Script from 'next/script'
import Header from '@/components/Header' // Подключаем изолированный блок шапки

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className="antialiased text-slate-900 bg-background min-h-screen flex flex-col">
        
        {/* Вызов шапки */}
        <Header />

        {/* Основной контент сайта */}
        <main className="flex-grow">
          {children}
        </main>

        {/* КРУГЛАЯ КНОПКА ОНЛАЙН-ЗАПИСИ (MEDFLEX) */}
        <div className="fixed bottom-5 right-5 z-50">
          <div 
            id="medflexRoundWidgetData"
            data-src="https://booking.medflex.ru/?user=38061275f1134bb6bb688d741b213f45&isRoundWidget=true"
          ></div>
        </div>
        
        <Script 
          src="https://booking.medflex.ru/components/round/round_widget_button.js" 
          strategy="lazyOnload"
        />
        <Script 
          src="https://booking.medflex.ru/components/medtochka-button/medtochka-widget-button.js" 
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}