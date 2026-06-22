'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F8F9FA] text-[#333333] border-t border-gray-300 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Основная сетка футера */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Колонка 1: О клинике и Лицензия */}
          <div>
            <div className="text-[#2E86C1] font-black text-lg tracking-tight uppercase mb-4">
              ЛДЦ Здоровая Семья
            </div>
            <p className="text-xs text-[#666666] leading-relaxed mb-4">
              Сеть многопрофильных медицинских и лабораторно-диагностических центров в Пензенской области. Официальный партнер лаборатории Гемотест.
            </p>
            <div className="text-[11px] text-[#333333] bg-white p-3 rounded-lg border border-gray-200">
              <span className="font-bold block text-[#2E86C1] uppercase tracking-wider mb-1">Медицинская лицензия</span>
              ЛО-58-01-002446 от 22.10.2020 г.<br />
              Выдана Министерством здравоохранения Пензенской области.
            </div>
          </div>

          {/* Колонка 2: Навигация по разделам (Карта сайта) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2E86C1] mb-4">
              Навигация
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="#departments" className="text-[#666666] hover:text-[#D4AF37] transition-colors">
                  Наши отделения
                </a>
              </li>
              <li>
                <a href="#doctors" className="text-[#666666] hover:text-[#D4AF37] transition-colors">
                  Наши специалисты
                </a>
              </li>
              <li>
                <a href="#services" className="text-[#666666] hover:text-[#D4AF37] transition-colors">
                  Услуги и сервисы
                </a>
              </li>
              <li>
                <a href="#advantages" className="text-[#666666] hover:text-[#D4AF37] transition-colors">
                  Преимущества клиники
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-[#666666] hover:text-[#D4AF37] transition-colors">
                  Отзывы пациентов
                </a>
              </li>
              <li>
                <a href="#booking-section" className="text-[#666666] hover:text-[#D4AF37] transition-colors">
                  Онлайн-запись
                </a>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Контакты центрального офиса */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2E86C1] mb-4">
              Контакты и связь
            </h4>
            <ul className="space-y-3 text-xs text-[#666666]">
              <li className="flex items-start gap-2">
                <span className="text-[#D4AF37]">📞</span>
                <div>
                  <span className="block font-bold text-[#333333]">Единый телефон:</span>
                  <a href="tel:+78412995801" className="hover:text-[#2E86C1] transition-colors">
                    8 (841-2) 99-58-01
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4AF37]">✉️</span>
                <div>
                  <span className="block font-bold text-[#333333]">Email для обращений:</span>
                  <a href="mailto:info@zdravaya-semya.ru" className="hover:text-[#2E86C1] transition-colors">
                    info@zdravaya-semya.ru
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4AF37]">💬</span>
                <div>
                  <span className="block font-bold text-[#333333]">Для правовых вопросов:</span>
                  <span className="text-[11px]">Генеральный директор / Главный врач</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Юридические реквизиты организации по вашему решению */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2E86C1] mb-4">
              Юридическая информация
            </h4>
            <div className="text-[11px] text-[#666666] space-y-1.5 leading-relaxed bg-white p-3.5 rounded-lg border border-gray-200">
              <div><strong className="text-[#333333]">Организация:</strong> ООО «ЛДЦ «Здоровая Семья»</div>
              <div><strong className="text-[#333333]">ИНН:</strong> 5838010123</div>
              <div><strong className="text-[#333333]">ОГРН:</strong> 1145838000456</div>
              <div><strong className="text-[#333333]">Юр. адрес:</strong> 442960, Пензенская область, г. Заречный, ул. им. М.В. Проценко, стр. 15</div>
            </div>
          </div>

        </div>

        {/* Разделитель */}
        <div className="border-t border-gray-300/70 my-6"></div>

        {/* Копирайт и техническая информация */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#888888]">
          <div>
            &copy; {currentYear} ООО «ЛДЦ «Здоровая Семья». Все права защищены.
          </div>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:underline">Политика конфиденциальности</a>
            <a href="/terms" className="hover:underline">Пользовательское соглашение</a>
          </div>
        </div>

        {/* Обязательный крупный дисклеймер Минздрава по вашему решению */}
        <div className="mt-8 border-t-2 border-gray-300/40 pt-4 text-center">
          <div className="text-sm md:text-lg font-black text-gray-400/80 tracking-widest leading-tight uppercase select-none">
            ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ. НЕОБХОДИМА КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА
          </div>
        </div>

      </div>
    </footer>
  )
}