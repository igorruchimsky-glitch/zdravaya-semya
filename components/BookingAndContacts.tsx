'use client'

import { useState, FormEvent } from 'react'

export default function BookingAndContacts() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [department, setDepartment] = useState('zarechny')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  // Базовая автоматическая маска для номера телефона РФ (+7 (XXX) XXX-XX-XX)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '') // Только цифры
    if (input.startsWith('7') || input.startsWith('8')) {
      input = input.substring(1)
    }
    input = input.substring(0, 10) // Ограничение длины

    let formatted = '+7'
    if (input.length > 0) formatted += ` (${input.substring(0, 3)}`
    if (input.length > 3) formatted += `) ${input.substring(3, 6)}`
    if (input.length > 6) formatted += `-${input.substring(6, 8)}`
    if (input.length > 8) formatted += `-${input.substring(8, 10)}`

    setPhone(input.length === 0 ? '' : formatted)
  }

  // Обработчик отправки формы в Telegram API
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (phone.length < 18) {
      alert('Пожалуйста, введите корректный номер телефона.')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, department, message }),
      })

      if (res.ok) {
        setStatus('success')
        setName('')
        setPhone('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <section id="booking-section" className="py-16 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2E86C1] uppercase tracking-wide">
            Запись на приём и анализы
          </h2>
          <p className="mt-2 text-sm text-[#666666]">
            Выберите удобный способ: моментальная запись через сервис МедТочка или быстрая заявка администратору
          </p>
        </div>

        {/* Двухколоночная структура */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ЛЕВАЯ КОЛОНКА (6/12): Виджет Medflex */}
          <div className="lg:col-span-6 bg-[#F8F9FA] border border-gray-200 rounded-2xl p-6 shadow-sm min-h-[480px] flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#2E86C1] uppercase tracking-widest block mb-2">Способ №1</span>
              <h3 className="text-lg font-bold text-[#333333] mb-4">Интерактивная онлайн-запись (МедТочка)</h3>
              <p className="text-sm text-[#666666] leading-relaxed mb-6">
                Вы можете самостоятельно выбрать врача, услугу, свободное время и записаться в режиме реального времени без участия регистратуры.
              </p>
              
              {/* Контейнер интеграции inline-виджета по ТЗ */}
              <div className="w-full bg-white rounded-xl border border-gray-300/60 overflow-hidden p-1 min-h-[300px] flex items-center justify-center">
                <div 
                  id="medflexMedtochkaWidgetInline"
                  data-src="https://booking.medflex.ru/?user=38061275f1134bb6bb688d741b213f45"
                  className="w-full h-full"
                >
                  <span className="text-xs text-gray-400">Загрузка интерактивного расписания Medflex...</span>
                </div>
              </div>
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА (6/12): Форма отправки в Telegram */}
          <div className="lg:col-span-6 bg-[#F8F9FA] border border-gray-200 rounded-2xl p-6 shadow-sm min-h-[480px]">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block mb-2">Способ №2</span>
            <h3 className="text-lg font-bold text-[#333333] mb-4">Срочная заявка в регистратуру</h3>
            <p className="text-sm text-[#666666] leading-relaxed mb-6">
              Оставьте контакты. Наш администратор свяжется с вами в течение 10 минут для подтверждения записи или подбора нужного анализа.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Поле: Имя */}
              <div>
                <label className="block text-xs font-bold text-[#333333] uppercase tracking-wider mb-1.5">Ваше Имя</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Иванович" 
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-[#333333] focus:outline-none focus:border-[#2E86C1] transition-colors"
                />
              </div>

              {/* Поле: Телефон с маской */}
              <div>
                <label className="block text-xs font-bold text-[#333333] uppercase tracking-wider mb-1.5">Номер телефона</label>
                <input 
                  type="text" 
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+7 (999) 999-99-99" 
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm font-mono text-[#333333] focus:outline-none focus:border-[#2E86C1] transition-colors"
                />
              </div>

              {/* Поле: Выбор филиала */}
              <div>
                <label className="block text-xs font-bold text-[#333333] uppercase tracking-wider mb-1.5">Выберите отделение</label>
                <select 
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-[#333333] focus:outline-none focus:border-[#2E86C1] transition-colors"
                >
                  <option value="г. Заречный, ул. Проценко 15">г. Заречный, ул. Проценко 15</option>
                  <option value="ул. Тернопольская 10 (Анализы)">ул. Тернопольская 10 (Только анализы)</option>
                  <option value="ул. Измайлова 58А">ул. Измайлова 58А</option>
                  <option value="пр-кт Строителей 174">пр-кт Строителей 174</option>
                </select>
              </div>

              {/* Поле: Сообщение */}
              <div>
                <label className="block text-xs font-bold text-[#333333] uppercase tracking-wider mb-1.5">Что вас интересует? (необязательно)</label>
                <textarea 
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Например: УЗИ брюшной полости или сдача биохимии крови..." 
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-[#333333] focus:outline-none focus:border-[#2E86C1] transition-colors resize-none"
                />
              </div>

              {/* Кнопка отправки заявки */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#bfa032] disabled:bg-gray-400 text-white font-bold text-sm rounded-lg uppercase tracking-wider transition-colors shadow-sm"
              >
                {status === 'loading' ? 'Отправка...' : 'Отправить заявку'}
              </button>

              {/* Статусы отправки */}
              {status === 'success' && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-lg text-center">
                  ✓ Заявка успешно отправлена! Администратор свяжется с вами.
                </div>
              )}
              {status === 'error' && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-lg text-center">
                  ⚠️ Ошибка отправки. Пожалуйста, позвоните нам по телефону.
                </div>
              )}
            </form>

          </div>

        </div>

      </div>
    </section>
  )
}