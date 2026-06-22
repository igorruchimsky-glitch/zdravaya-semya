import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Заявка успешно отправлена | ЛДЦ «Здоровая Семья»',
  description: 'Благодарим за обращение в наш медицинский центр. Администратор свяжется с вами в ближайшее время.',
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 pt-24 pb-16">
      <div className="max-w-2xl w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm text-center space-y-8">
        
        {/* Иконка успеха */}
        <div className="mx-auto w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-3xl shadow-sm animate-bounce">
          ✓
        </div>

        {/* Заголовок */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Ваша заявка успешно принята!
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Благодарим за доверие к нашему центру. Администратор клиники уже видит ваше обращение и свяжется с вами в течение 15–30 минут для подтверждения даты и времени приёма.
          </p>
        </div>

        <hr className="border-slate-150" />

        {/* Памятка пациенту */}
        <div className="text-left space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 text-center sm:text-left">
            Полезная информация перед визитом:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600">
            <div className="bg-slate-50 p-4 rounded-xl space-y-1">
              <span className="text-base">📄</span> <strong>Что взять с собой?</strong>
              <p className="text-xs text-slate-500 leading-normal">
                Паспорт (для оформления договора), а также результаты предыдущих исследований, анализов или заключения врачей (при наличии).
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl space-y-1">
              <span className="text-base">🧪</span> <strong>Подготовка к анализам</strong>
              <p className="text-xs text-slate-500 leading-normal">
                Большинство лабораторных исследований и УЗИ брюшной полости сдаются строго натощак. Пожалуйста, уточняйте правила у администратора.
              </p>
            </div>
          </div>
        </div>

        {/* Блок экстренной связи */}
        <div className="bg-blue-50/60 border border-blue-100/80 rounded-2xl p-4 text-sm text-slate-700">
          <p className="leading-relaxed">
            Если вам необходимо срочно изменить параметры записи или у вас возникли неотложные вопросы, вы можете связаться с нами напрямую по общему телефону:
          </p>
          <p className="font-mono text-base font-bold text-blue-900 mt-2">
            8 (841-2) 99-58-01
          </p>
        </div>

        {/* Кнопка возврата */}
        <div className="pt-2">
          <Link 
            href="/" 
            className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-sm"
          >
            Вернуться на главную
          </Link>
        </div>

      </div>
    </main>
  )
}