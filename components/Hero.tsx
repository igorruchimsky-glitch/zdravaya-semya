'use client'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-blue-50/50 py-20 md:py-28 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        
        {/* Крупный синий заголовок H1 по ТЗ */}
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#2E86C1] max-w-4xl mx-auto leading-tight">
          Лабораторно-диагностический центр «Здоровая Семья»
        </h1>
        
        {/* Подзаголовок со второстепенным текстом */}
        <p className="mt-6 text-lg md:text-xl text-[#666666] font-medium max-w-2xl mx-auto leading-relaxed">
          Анализы, УЗИ, приём врачей по франшизе Гемотест в Пензе и Заречном. Быстро, экспертно, рядом с домом.
        </p>

        {/* Две конвеpсионные кнопки по структуре taomed.ru */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {/* Главная золотая кнопка */}
          <a 
            href="#booking-section"
            className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] hover:bg-[#bfa032] text-white text-base font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 text-center"
          >
            Записаться онлайн
          </a>

          {/* Прозрачная кнопка с золотой рамкой */}
          <a 
            href="#departments"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-amber-50 text-base font-bold rounded-xl transition-all text-center"
          >
            Наши отделения
          </a>

        </div>

      </div>
    </section>
  )
}