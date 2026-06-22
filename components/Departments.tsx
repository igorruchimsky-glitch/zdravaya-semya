'use client'

export default function Departments() {
  const departmentsData = [
    {
      id: 'zarechny',
      title: 'ОТДЕЛЕНИЕ В Г. ЗАРЕЧНЫЙ',
      address: 'ул. им. М.В. Проценко, строение 15',
      phone: '8 (841-2) 99-58-01 (доб. 1)',
      hours: 'пн-пт с 07:00 до 14:00, сб с 07:30 до 14:30',
      gemotestUrl: 'https://www.gemotest.ru/', // Замените на прямую ссылку филиала при наличии
      prodoctorovUrl: 'https://prodoctorov.ru/', // Замените на прямую ссылку филиала при наличии
      hasDoctors: true,
    },
    {
      id: 'ternopolskaya',
      title: 'ОТДЕЛЕНИЕ НА ТЕРНОПОЛЬСКОЙ',
      address: 'ул. Тернопольская, д. 10, пом. 7 (Ближнее Арбеково)',
      phone: '8 (841-2) 99-58-01 (доб. 2)',
      hours: 'пн-сб с 07:30 до 14:30',
      gemotestUrl: 'https://www.gemotest.ru/',
      prodoctorovUrl: 'https://prodoctorov.ru/',
      hasDoctors: false, // Исключаем кнопку по ТЗ
    },
    {
      id: 'izmaylova',
      title: 'ОТДЕЛЕНИЕ НА ИЗМАЙЛОВА',
      address: 'ул. Измайлова, 58А (корп. 3)',
      phone: '8 (841-2) 99-58-01', // При необходимости укажите добавочный
      hours: 'пн-пт с 07:30 до 14:30, сб с 07:30 до 14:30',
      gemotestUrl: 'https://www.gemotest.ru/',
      prodoctorovUrl: 'https://prodoctorov.ru/',
      hasDoctors: true,
    },
    {
      id: 'stroitiley',
      title: 'ОТДЕЛЕНИЕ НА ПРОСПЕКТЕ СТРОИТЕЛЕЙ',
      address: 'пр-кт Строителей, д. 174 (Дальнее Арбеково)',
      phone: '8 (841-2) 99-58-01 (доб. 3)',
      hours: 'пн-сб с 07:30 до 14:30',
      gemotestUrl: 'https://www.gemotest.ru/',
      prodoctorovUrl: 'https://prodoctorov.ru/',
      hasDoctors: true,
    }
  ];

  return (
    <section id="departments" className="py-16 bg-[#F8F9FA] border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Заголовок секции по структуре taomed.ru */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2E86C1] uppercase tracking-wide">
            Наши отделения
          </h2>
          <p className="mt-2 text-sm md:text-base text-[#666666]">
            Информация о филиалах медицинского центра, графике работы и контактных телефонах
          </p>
        </div>

        {/* Сетка карточек: 1 колонка на мобильных, 2 на планшетах, 4 на десктопе */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departmentsData.map((dept) => (
            <div 
              key={dept.id} 
              className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between transition-all hover:shadow-md"
            >
              <div>
                {/* Название отделения */}
                <h3 className="text-sm font-bold text-[#2E86C1] mb-4 uppercase tracking-tight min-h-[40px] flex items-center">
                  {dept.title}
                </h3>

                {/* Блок с адресом */}
                <div className="mb-3 flex items-start gap-2 text-sm">
                  <span className="text-[#D4AF37] mt-0.5">📍</span>
                  <div>
                    <span className="block font-semibold text-[#333333]">Адрес:</span>
                    <span className="text-[#666666]">{dept.address}</span>
                  </div>
                </div>

                {/* Блок с телефоном */}
                <div className="mb-3 flex items-start gap-2 text-sm">
                  <span className="text-[#D4AF37] mt-0.5">📞</span>
                  <div>
                    <span className="block font-semibold text-[#333333]">Телефон:</span>
                    <a href={`tel:${dept.phone.replace(/[^0-8+]/g, '')}`} className="text-[#666666] hover:text-[#2E86C1] transition-colors">
                      {dept.phone}
                    </a>
                  </div>
                </div>

                {/* Блок с часами работы */}
                <div className="mb-4 flex items-start gap-2 text-sm">
                  <span className="text-[#D4AF37] mt-0.5">🕒</span>
                  <div>
                    <span className="block font-semibold text-[#333333]">Режим работы:</span>
                    <span className="text-[#666666]">{dept.hours}</span>
                  </div>
                </div>

                {/* Ссылки на внешние агрегаторы (Гемотест / ПроДокторов) */}
                <div className="flex gap-4 pt-3 border-t border-gray-100 mb-6">
                  <a 
                    href={dept.gemotestUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs font-bold text-[#666666] hover:text-[#D4AF37] transition-colors flex items-center gap-1"
                  >
                    🩸 Гемотест
                  </a>
                  <a 
                    href={dept.prodoctorovUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs font-bold text-[#666666] hover:text-[#D4AF37] transition-colors flex items-center gap-1"
                  >
                    ⭐ ПроДокторов
                  </a>
                </div>
              </div>

              {/* Кнопка записи (Зависит от типа отделения) */}
              <div>
                {dept.hasDoctors ? (
                  <a
                    href="#booking-section"
                    className="block w-full py-2.5 bg-[#D4AF37] hover:bg-[#bfa032] text-white text-xs font-bold rounded-lg text-center uppercase tracking-wider transition-colors"
                  >
                    Записаться
                  </a>
                ) : (
                  <div className="bg-blue-50 border border-blue-100 text-[#2E86C1] text-[11px] font-semibold p-2.5 rounded-lg text-center leading-tight">
                    🔬 Только забор анализов (приём врачей отсутствует)
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}