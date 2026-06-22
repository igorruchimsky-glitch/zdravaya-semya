'use client'

import { useState } from 'react'

export default function ReviewsAndPartner() {
  // Данные отзывов для карусели
  const reviewsData = [
    {
      id: 1,
      patient: 'Ольга В.',
      date: 'Май 2026',
      text: 'Очень понравилось отделение на Измайлова. Чисто, уютно, персонал вежливый. Сдавала анализы по франшизе Гемотест, результаты пришли на электронную почту уже на следующий день. Большое спасибо за оперативность!',
      rating: '⭐⭐⭐⭐⭐',
      sourceUrl: 'https://prodoctorov.ru/' // Замените на прямую ссылку филиала на ПроДокторов
    },
    {
      id: 2,
      patient: 'Михаил К.',
      date: 'Апрель 2026',
      text: 'Был на приеме у невролога Игоря Николаевича Ручимского. Настоящий профессионал своего дела. Провел тщательный осмотр, назначил комплексную терапию, которая помогла избавиться от многолетних болей в спине.',
      rating: '⭐⭐⭐⭐⭐',
      sourceUrl: 'https://prodoctorov.ru/'
    },
    {
      id: 3,
      patient: 'Елена Д.',
      date: 'Март 2026',
      text: 'Постоянно пользуемся услугой выезда на дом для ребенка. Медсестры приезжают вовремя, забор крови делают аккуратно и без слез. Огромный плюс, что действует бонусная программа Гемотеста.',
      rating: '⭐⭐⭐⭐⭐',
      sourceUrl: 'https://prodoctorov.ru/'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === reviewsData.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? reviewsData.length - 1 : prev - 1))
  }

  return (
    <>
      {/* ================= СЕКЦИЯ: ОТЗЫВЫ ПАЦИЕНТОВ ================= */}
      <section id="reviews" className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2E86C1] uppercase tracking-wide">
              Отзывы наших пациентов
            </h2>
            <p className="mt-2 text-sm text-[#666666]">
              Честные мнения о качестве обслуживания и профессионализме наших врачей
            </p>
          </div>

          {/* Контейнер слайдера */}
          <div className="relative bg-[#F8F9FA] border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
            
            {/* Текст отзыва */}
            <div className="min-h-[160px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="font-bold text-[#333333] block text-base">{reviewsData[currentSlide].patient}</span>
                    <span className="text-xs text-[#666666]">{reviewsData[currentSlide].date}</span>
                  </div>
                  <div className="text-sm">{reviewsData[currentSlide].rating}</div>
                </div>
                <p className="text-sm md:text-base text-[#333333] leading-relaxed italic">
                  "{reviewsData[currentSlide].text}"
                </p>
              </div>

              {/* Ссылка на источник ПроДокторов */}
              <div className="mt-6 pt-4 border-t border-gray-200/60 flex justify-between items-center flex-wrap gap-2">
                <span className="text-xs text-[#666666]">Источник: ПроДокторов Пенза</span>
                <a 
                  href={reviewsData[currentSlide].sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#2E86C1] hover:text-[#D4AF37] transition-colors uppercase tracking-wider"
                >
                  Читать все отзывы на ПроДокторов →
                </a>
              </div>
            </div>

            {/* Стрелки управления каруселью */}
            <div className="absolute top-1/2 -translate-y-1/2 left-2 md:-left-14">
              <button 
                onClick={prevSlide}
                className="w-10 h-10 bg-white border border-gray-200 text-[#333333] hover:text-[#D4AF37] rounded-full flex items-center justify-center shadow-sm hover:shadow transition-all"
                aria-label="Предыдущий отзыв"
              >
                ←
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-2 md:-right-14">
              <button 
                onClick={nextSlide}
                className="w-10 h-10 bg-white border border-gray-200 text-[#333333] hover:text-[#D4AF37] rounded-full flex items-center justify-center shadow-sm hover:shadow transition-all"
                aria-label="Следующий отзыв"
              >
                →
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ================= СЕКЦИЯ: О ПАРТНЁРЕ ГЕМОТЕСТ ================= */}
      <section id="partner-gemotest" className="py-16 bg-[#F8F9FA] border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Двухколоночный презентабельный блок по вашему решению */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-gray-200 rounded-2xl overflow-hidden p-6 md:p-10 shadow-sm">
            
            {/* Левая колонка: Описание и коммерческие триггеры */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block mb-2">Надежный фундамент здоровья</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2E86C1] mb-5 uppercase tracking-wide leading-tight">
                О партнёре — Гемотест
              </h2>
              
              <p className="text-sm md:text-base text-[#333333] leading-relaxed mb-4">
                «ЛДЦ «Здоровая Семья» официально функционирует в технологическом партнерстве с независимой лабораторией <strong>Гемотест</strong> — международной медицинской сетью, насчитывающей более 2000 современных отделений.
              </p>
              
              <p className="text-sm text-[#666666] leading-relaxed mb-6">
                Все лабораторные исследования выполняются на автоматизированных роботизированных аналитических системах экспертного класса. Пациентам нашего центра доступны федеральные стандарты качества, специализированные выездные бригады, комплексные чекапы здоровья и единая дисконтная накопительная система лояльности.
              </p>

              <a 
                href="https://www.gemotest.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-amber-50 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
              >
                Официальный сайт Гемотест →
              </a>
            </div>

            {/* Правая колонка: Графический презентационный блок статуса */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-blue-50 border border-gray-100 rounded-xl p-6 text-center flex flex-col justify-center items-center min-h-[280px]">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-2xl text-[#2E86C1]">
                🔬
              </div>
              <div className="text-2xl font-black text-slate-800 tracking-tight mb-1">2 000 +</div>
              <div className="text-xs font-bold text-[#666666] uppercase tracking-wider mb-4">Технологичных отделений сети</div>
              <div className="w-full bg-white rounded-lg p-3 border border-gray-200/80 text-left text-xs text-[#333333] space-y-2">
                <div className="flex items-center gap-2">✔️ <span className="font-medium">Многоуровневый штрихкодированный контроль пробирок</span></div>
                <div className="flex items-center gap-2">✔️ <span className="font-medium">Прямая интеграция лабораторных баз данных</span></div>
                <div className="flex items-center gap-2">✔️ <span className="font-medium">Результаты признаются всеми госучреждениями РФ</span></div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  )
}