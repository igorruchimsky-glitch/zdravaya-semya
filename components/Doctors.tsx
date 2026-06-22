'use client'

export default function Doctors() {
  const doctorsData = [
    {
      id: 'ruchimsky',
      name: 'Ручимский Игорь Николаевич',
      specialty: 'невролог, мануальный терапевт',
      departments: ['г. Заречный', 'ул. Измайлова', 'пр-кт Строителей'],
    },
    {
      id: 'karpina',
      name: 'Карпина Н.Ю.',
      specialty: 'терапевт',
      departments: ['г. Заречный', 'ул. Измайлова'],
    },
    {
      id: 'titorenko',
      name: 'Титоренко А.А.',
      specialty: 'акушер-гинеколог, детский гинеколог, гинеколог-эндокринолог, УЗИ',
      departments: ['пр-кт Строителей', 'ул. Измайлова'],
    },
    {
      id: 'parshina',
      name: 'Паршина В.В.',
      specialty: 'акушер-гинеколог, УЗИ',
      departments: ['пр-кт Строителей', 'ул. Измайлова'],
    },
    {
      id: 'belousova',
      name: 'Белоусова О.Н.',
      specialty: 'терапевт',
      departments: ['пр-кт Строителей'],
    },
    {
      id: 'grishina',
      name: 'Гришина И.А.',
      specialty: 'эндокринолог',
      departments: ['пр-кт Строителей'],
    }
  ];

  return (
    <section id="doctors" className="py-16 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Заголовок секции по структуре taomed.ru */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2E86C1] uppercase tracking-wide">
            Наши специалисты
          </h2>
          <p className="mt-2 text-sm md:text-base text-[#666666]">
            Высококвалифицированные врачи с многолетним опытом работы готовы оказать вам помощь
          </p>
        </div>

        {/* Сетка карточек врачей: 1 колонка на мобильных, 2-3 на планшетах, 3 на десктопе */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctorsData.map((doctor) => (
            <div 
              key={doctor.id} 
              className="bg-[#F8F9FA] rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-md"
            >
              <div>
                {/* Временная стильная заглушка фото врача в сине-белых тонах */}
                <div className="w-full h-64 bg-gradient-to-b from-blue-50 to-slate-100 flex items-center justify-center relative border-b border-gray-200">
                  <svg className="w-24 h-24 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-sm text-[10px] text-[#2E86C1] font-bold uppercase px-2 py-1 rounded border border-blue-100">
                    ЛДЦ Здоровая Семья
                  </div>
                </div>

                {/* Контентная часть карточки */}
                <div className="p-5">
                  {/* ФИО */}
                  <h3 className="text-lg font-bold text-[#333333] tracking-tight min-h-[56px] flex items-start">
                    {doctor.name}
                  </h3>

                  {/* Специализация (в одну строку) */}
                  <p className="text-sm font-semibold text-[#2E86C1] mt-1 mb-4 italic min-h-[40px]">
                    {doctor.specialty}
                  </p>

                  {/* Места приёма */}
                  <div className="pt-3 border-t border-gray-200/60">
                    <span className="text-xs font-bold text-[#666666] block mb-2 uppercase tracking-wider">
                      Адреса приёма:
                    </span>
                    <div className="flex flex-wrap gap-1.5 min-h-[52px]">
                      {doctor.departments.map((dept, index) => (
                        <span 
                          key={index} 
                          className="text-xs bg-white text-[#333333] border border-gray-300 px-2.5 py-1 rounded-md font-medium"
                        >
                          🏥 {dept}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Кнопка действия */}
              <div className="p-5 pt-0">
                <a
                  href="#booking-section"
                  className="block w-full py-3 bg-[#D4AF37] hover:bg-[#bfa032] text-white text-xs font-bold rounded-lg text-center uppercase tracking-wider transition-colors shadow-sm"
                >
                  Записаться к врачу
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}