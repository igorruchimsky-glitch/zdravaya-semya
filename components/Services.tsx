'use client'

export default function Services() {
  const servicesData = [
    {
      id: 'labs',
      title: 'Лабораторные исследования',
      description: 'Все виды анализов по франшизе международного уровня Гемотест. Быстрое получение результатов на email и в личном кабинете.',
      icon: (
        <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      id: 'diagnostics',
      title: 'УЗИ и ЭКГ',
      description: 'Ультразвуковая диагностика внутренних органов, суставов и сосудов на оборудовании экспертного класса. ЭКГ с расшифровкой.',
      icon: (
        <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: 'appointments',
      title: 'Приём врачей',
      description: 'Консультации ведущих специалистов: терапевта, невролога, гинеколога, эндокринолога и мануального терапевта по предварительной записи.',
      icon: (
        <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'procedures',
      title: 'Процедурный кабинет',
      description: 'Выполнение медицинских манипуляций любой сложности: внутривенные капельницы, уколы (внутримышечные, подкожные) строго по назначению врача.',
      icon: (
        <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3m0 14v3m-7-7h3m10 0h3" />
        </svg>
      )
    },
    {
      id: 'home-visit',
      title: 'Выезд на дом',
      description: 'Профессиональный забор анализов, проведение УЗИ и ЭКГ на дому для пациентов всех возрастов, включая новорождённых детей.',
      icon: (
        <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'telemed',
      title: 'Телемедицина',
      description: 'Удалённые бесплатные консультации профильных медицинских экспертов Гемотест по интерпретации результатов выполненных исследований.',
      icon: (
        <svg className="w-8 h-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="py-16 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Заголовок секции */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2E86C1] uppercase tracking-wide">
            Услуги и сервисы
          </h2>
          <p className="mt-2 text-sm md:text-base text-[#666666]">
            Широкий спектр медицинских и лабораторно-диагностических услуг для всей семьи
          </p>
        </div>

        {/* Сетка карточек услуг: 1 в мобайле, 2 в планшете, 3 на десктопе */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <div 
              key={service.id} 
              className="bg-[#F8F9FA] rounded-xl p-6 border border-gray-200 flex flex-col justify-between transition-all hover:shadow-md group"
            >
              <div>
                {/* Блок с золотой SVG-иконкой */}
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-sm mb-5 transition-transform group-hover:scale-105">
                  {service.icon}
                </div>

                {/* Название услуги */}
                <h3 className="text-lg font-bold text-[#333333] mb-3 tracking-tight">
                  {service.title}
                </h3>

                {/* Краткое описание */}
                <p className="text-sm text-[#666666] leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Единственная конверсионная кнопка по согласованию */}
              <div>
                <a
                  href="#booking-section"
                  className="block w-full py-2.5 bg-white hover:bg-[#D4AF37] border-2 border-[#D4AF37] text-[#D4AF37] hover:text-white text-xs font-bold rounded-lg text-center uppercase tracking-wider transition-all"
                >
                  Записаться
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}