import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Контакты и адреса отделений | ЛДЦ «Здоровая Семья»',
  description: 'Адреса, телефоны и режим работы медицинских центров ЛДЦ «Здоровая Семья» в Пензе и Заречном. Единый многоканальный телефон, реквизиты и лицензии клиники.',
}

const branches = [
  {
    id: 1,
    title: 'Отделение в г. Заречный',
    address: '442960, Пензенская обл., г. Заречный, ул. им. М.В. Проценко, строение 15',
    phone: '8 (841-2) 99-58-01 (доб. 1)',
    telLink: '+78412995801',
    time: 'пн-пт с 07:00 до 14:00\nсб с 07:30 до 14:30\nвс — выходной',
    borderColor: 'border-t-blue-900',
    textColor: 'text-blue-950'
  },
  {
    id: 2,
    title: 'Отделение на Тернопольской',
    address: '440066, г. Пенза, ул. Тернопольская, д. 10, пом. 7 (Ближнее Арбеково)',
    phone: '8 (841-2) 99-58-01 (доб. 2)',
    telLink: '+78412995801',
    time: 'пн-сб с 07:30 до 14:30\nвс — выходной',
    borderColor: 'border-t-teal-600',
    textColor: 'text-teal-700'
  },
  {
    id: 3,
    title: 'Отделение на проспекте Строителей',
    address: '440066, г. Пенза, пр-кт Строителей, д. 174 (Дальнее Арбеково)',
    phone: '8 (841-2) 99-58-01 (доб. 3)',
    telLink: '+78412995801',
    time: 'пн-сб с 07:30 до 14:30\nвс — выходной',
    borderColor: 'border-t-blue-600',
    textColor: 'text-blue-600'
  },
  {
    id: 4,
    title: 'Отделение на Измайлова',
    address: '440000, г. Пенза, ул. Измайлова, д. 58А, корп. 3, пом. 4 (ГПЗ-24)',
    phone: '8 (841-2) 99-58-01 (доб. 4)',
    telLink: '+78412995801',
    time: 'пн-сб с 07:30 до 14:30\nвс — выходной',
    borderColor: 'border-t-indigo-600',
    textColor: 'text-indigo-600'
  }
]

export default function ContactsPage() {
  return (
    <div className="bg-white text-slate-800 font-sans min-h-screen pb-20">

      {/* Шапка страницы */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white pt-32 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Наши контакты и отделения
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Сеть многопрофильных медицинских и диагностических центров в Пензенской области
          </p>
        </div>
      </section>

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto mt-12 px-4 space-y-16">

        {/* Блок общего многоканального телефона */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center max-w-3xl mx-auto space-y-4 shadow-sm">
          <div className="text-3xl">📞</div>
          <h2 className="text-xl font-bold text-slate-950">
            Единый многоканальный номер телефона
          </h2>
          <p className="text-2xl sm:text-3xl font-black text-teal-600 font-mono tracking-wide">
            8 (841-2) 99-58-01
          </p>
          <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
            Позвоните нам, чтобы задать вопрос, уточнить правила подготовки к анализам или записаться на приём к специалистам.
          </p>
          <div className="pt-2">
            <a href="tel:+78412995801" className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-sm">
              Позвонить в клинику
            </a>
          </div>
        </div>

        {/* Сетка филиалов */}
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight text-center sm:text-left">
            Адреса медицинских центров
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {branches.map((b) => (
              <div key={b.id} className={`bg-white border border-slate-200 border-t-4 ${b.borderColor} rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden hover:shadow-md transition-shadow`}>
                <div className="space-y-4">
                  <h3 className="text-base font-black text-slate-950 leading-snug">
                    {b.title}
                  </h3>
                  <div className="text-xs sm:text-sm text-slate-600 space-y-3">
                    <p className="leading-relaxed">
                      <strong className="text-slate-900 block mb-1">📍 Адрес:</strong>
                      {b.address}
                    </p>
                    <p>
                      <strong className="text-slate-900 block mb-1">📞 Телефон филиала:</strong>
                      <span className="font-mono font-bold text-slate-950 text-sm">{b.phone}</span>
                    </p>
                    <p className="whitespace-pre-line leading-relaxed">
                      <strong className="text-slate-900 block mb-1">🕒 Режим работы:</strong>
                      {b.time}
                    </p>
                  </div>
                </div>

                {/* Кнопки действий внутри карточки */}
                <div className="flex flex-col gap-2 mt-6 pt-4 border-t border-slate-100">
                  <a href={`tel:${b.telLink}`} className="w-full text-center bg-slate-50 hover:bg-slate-100 text-slate-900 py-2.5 rounded-xl text-xs font-bold transition-colors border border-slate-200">
                    📞 Набрать номер (доб. {b.id})
                  </a>
                  <Link href="/appointment" className={`w-full text-center bg-white border border-current ${b.textColor} py-2.5 rounded-xl text-xs font-bold transition-colors hover:bg-slate-50`}>
                    Записаться сюда →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* НОВЫЙ БЛОК: ЮРИДИЧЕСКАЯ И ПРАВОВАЯ ИНФОРМАЦИЯ */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl font-extrabold text-slate-950 tracking-tight flex items-center gap-2">
              <span>🛡️</span> Лицензии и юридическая информация
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Официальные сведения о медицинской организации в соответствии с требованиями Минздрава РФ</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Реквизиты организации */}
            <div className="space-y-3 lg:col-span-1">
              <h4 className="text-sm font-black uppercase text-slate-400 tracking-wider">Наименование и реквизиты</h4>
              <div className="text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed">
                <p><strong>Полное наименование:</strong><br />Общество с ограниченной ответственностью Лечебно-диагностический центр «Здоровая Семья»</p>
                <p><strong>Сокращенное наименование:</strong><br />ООО ЛДЦ «Здоровая Семья»</p>
                <p><strong>Руководство:</strong><br />Генеральный директор / Главный врач:<br />Ручимский Игорь Николаевич</p>
              </div>
            </div>

            {/* Сведения о лицензии */}
            <div className="space-y-3 lg:col-span-1">
              <h4 className="text-sm font-black uppercase text-slate-400 tracking-wider">Медицинская лицензия</h4>
              <div className="text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed">
                <p><strong>Регистрационный номер:</strong><br />Л041-01166-58/00325325</p>
                <p><strong>Статус:</strong><br /><span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md text-xs">Действующая бессрочно</span></p>
                <p><strong>Орган, выдавший лицензию:</strong><br />Министерство здравоохранения Пензенской области</p>
                <p className="text-xs text-slate-400 italic">Предоставляемые услуги соответствуют номенклатуре работ и услуг, утвержденных лицензией на осуществление медицинской деятельности.</p>
              </div>
            </div>

            {/* Документы для скачивания */}
            <div className="space-y-3 lg:col-span-1">
              <h4 className="text-sm font-black uppercase text-slate-400 tracking-wider">Документы для ознакомления</h4>
              <div className="flex flex-col gap-2">
                <a 
                  href="/docs/licence.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 bg-white hover:bg-slate-100/80 border border-slate-200 p-3 rounded-xl transition-colors group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">📄</span>
                  <div className="text-left">
                    <p className="text-xs sm:text-sm font-bold text-slate-950 m-0">Выписка из реестра лицензий</p>
                    <p className="text-[11px] text-slate-400 m-0">Скачать PDF (официальный документ)</p>
                  </div>
                </a>

                <a 
                  href="/docs/rules.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 bg-white hover:bg-slate-100/80 border border-slate-200 p-3 rounded-xl transition-colors group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">⚖️</span>
                  <div className="text-left">
                    <p className="text-xs sm:text-sm font-bold text-slate-950 m-0">Правила предоставления платных услуг</p>
                    <p className="text-[11px] text-slate-400 m-0">Скачать PDF • Постановление №736</p>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  )
}