'use client'

export default function Advantages() {
  const advantagesData = [
    {
      id: 1,
      title: 'Опыт и масштаб с 2014 года',
      description: 'Более 10 лет заботимся о вашем здоровье. Для вашего удобства открыто 4 современных отделения.',
      icon: (
        <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Бесплатная консультация врача',
      description: 'Уникальный сервис Гемотест: бесплатный разбор и интерпретация результатов ваших анализов профильным доктором.',
      icon: (
        <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Профессиональный выезд на дом',
      description: 'Бережный забор анализов, проведение экспертного УЗИ и ЭКГ в комфортных для вас домашних условиях.',
      icon: (
        <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Программа «Гемотест Бонус»',
      description: 'Экономьте на диагностике: возвращаем до 15% в виде кешбэка рублей на ваш персональный бонусный счет.',
      icon: (
        <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 5,
      title: 'Приём пациентов с 0 лет',
      description: 'Особый подход к самым маленьким: сертифицированные специалисты для работы с новорождёнными детьми.',
      icon: (
        <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      id: 6,
      title: 'Собственная медицинская лицензия',
      description: 'Полная юридическая прозрачность, строгое соответствие стандартам Минздрава Пензенской области.',
      icon: (
        <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ];

  return (
    <section id="advantages" className="py-16 bg-[#F8F9FA] border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Заголовок секции по структуре taomed.ru */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2E86C1] uppercase tracking-wide">
            Почему выбирают нас
          </h2>
          <p className="mt-2 text-sm md:text-base text-[#666666]">
            Стандарты федеральной медицинской сети в сочетании с индивидуальной заботой о каждом пациенте
          </p>
        </div>

        {/* Сетка горизонтальных плашек: 1 в мобайле, 2 в планшете, 3 на десктопе */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantagesData.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-start gap-4 transition-all hover:shadow-md"
            >
              {/* Контейнер для золотой иконки */}
              <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center border border-amber-100">
                {item.icon}
              </div>

              {/* Текстовая правая часть плашки */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-[#333333] mb-1 tracking-tight leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-[#666666] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}