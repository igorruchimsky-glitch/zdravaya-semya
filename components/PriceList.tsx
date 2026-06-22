'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

// Инициализация публичного клиента Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface PriceItem {
  id: number
  sku: string
  title: string
  price: number
  category: string
}

export default function PriceList() {
  // Список филиалов, соответствующий кодам в базе данных
  const departments = [
    { code: '5287', name: 'г. Заречный, ул. Проценко 15' },
    { code: '50435', name: 'г. Пенза, ул. Измайлова 58А' },
    { code: '50362', name: 'г. Пенза, пр-кт Строителей 174' },
    { code: '50008', name: 'г. Пенза, ул. Тернопольская 10 (Анализы)' },
  ]

  // Списочные категории
  const categories = ['Все услуги', 'Анализы и исследования', 'УЗИ и ЭКГ', 'Приём врачей', 'Процедуры', 'Выезд на дом']

  // Состояние фильтров
  const [selectedDept, setSelectedDept] = useState(departments[0].code)
  const [selectedCategory, setSelectedCategory] = useState('Все услуги')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Состояние данных
  const [prices, setPrices] = useState<PriceItem[]>([])
  const [loading, setLoading] = useState(true)

  // Загрузка данных из Supabase при изменении филиала
  useEffect(() => {
    async function fetchPrices() {
      setLoading(true)
      const { data, error } = await supabase
        .from('prices')
        .select('id, sku, title, price, category')
        .eq('department_code', selectedDept)
        .order('title', { ascending: true })

      if (!error && data) {
        setPrices(data as PriceItem[])
      }
      setLoading(false)
    }

    if (supabaseUrl && supabaseAnonKey) {
      fetchPrices()
    }
  }, [selectedDept])

  // Клиентская фильтрация данных по категориям и поисковому запросу
  const filteredPrices = prices.filter((item) => {
    const matchesCategory = selectedCategory === 'Все услуги' || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.sku.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section id="prices-section" className="py-16 bg-[#F8F9FA] border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Заголовок */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2E86C1] uppercase tracking-wide">
            Стоимость услуг и анализов
          </h2>
          <p className="mt-2 text-sm text-[#666666]">
            Цены актуальны и обновляются напрямую из технологической базы Гемотест
          </p>
        </div>

        {/* Панель управления: Выбор филиала и Поиск */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Выбор отделения */}
          <div className="md:col-span-5">
            <label className="block text-xs font-bold text-[#333333] uppercase tracking-wider mb-1.5">Выберите Ваше отделение:</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#333333] focus:outline-none focus:border-[#2E86C1]"
            >
              {departments.map((dept) => (
                <option key={dept.code} value={dept.code}>{dept.name}</option>
              ))}
            </select>
          </div>

          {/* Поиск по прайсу */}
          <div className="md:col-span-7">
            <label className="block text-xs font-bold text-[#333333] uppercase tracking-wider mb-1.5">Поиск анализа или процедуры:</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Введите название (например: Биохимия, УЗИ, Натрий)..."
                className="w-full bg-[#F8F9FA] border border-gray-300 rounded-lg pl-4 pr-10 py-2.5 text-sm text-[#333333] focus:outline-none focus:border-[#2E86C1]"
              />
              <span className="absolute right-3 top-3.5 text-gray-400 text-xs select-none">🔍</span>
            </div>
          </div>

        </div>

        {/* Навигация по категориям (Табы) */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all ${
                selectedCategory === cat
                  ? 'bg-[#2E86C1] border-[#2E86C1] text-white shadow-sm'
                  : 'bg-white border-gray-200 text-[#666666] hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Вывод таблицы цен */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-12 text-center text-sm text-[#666666] font-medium">
              🔄 Синхронизация цен с базой данных Supabase...
            </div>
          ) : filteredPrices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-[#333333]">
                <thead>
                  <tr className="bg-[#F8F9FA] border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-[#666666]">
                    <th className="px-6 py-4 w-28">Артикул</th>
                    <th className="px-6 py-4">Наименование медицинской услуги</th>
                    <th className="px-6 py-4 w-32 text-right">Стоимость</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {filteredPrices.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-3.5 text-xs font-mono text-gray-500 uppercase">{item.sku}</td>
                      <td className="px-6 py-3.5 leading-snug">{item.title}</td>
                      <td className="px-6 py-3.5 text-right font-bold text-[#2E86C1] whitespace-nowrap text-base">
                        {item.price.toLocaleString('ru-RU')} ₽
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-sm text-[#666666] italic">
              Ничего не найдено по вашему запросу. Попробуйте изменить ключевое слово или сменить категорию.
            </div>
          )}
        </div>

        {/* Дополнительный коммерческий триггер */}
        <div className="mt-6 text-center text-xs text-[#666666]">
          * По техническим регламентам взятие биоматериала (кровь, мазок) оплачивается отдельно согласно прайс-листу процедурного кабинета.
        </div>

      </div>
    </section>
  )
}