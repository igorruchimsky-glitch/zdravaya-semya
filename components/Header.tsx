'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const styles = {
    header: {
      backgroundColor: '#FFFFFF',
      borderBottom: '2px solid #F8F9FA',
      position: 'sticky' as const,
      top: 0,
      zIndex: 50,
      width: '100%',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    },
    accentButton: {
      backgroundColor: '#D4AF37',
      color: '#FFFFFF',
      padding: '10px 20px',
      borderRadius: '6px',
      fontWeight: '700',
      fontSize: '14px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    }
  }

  return (
    <header style={styles.header}>
      {/* Верхняя тонкая инфо-панель (как на taomed.ru) */}
      <div className="w-full bg-slate-100 py-1.5 px-4 text-xs text-gray-600 border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>Лицензия № Л041-01166-58/00328729 от 11.09.2018</div>
          <div className="font-medium">Регион: Пенза и Заречный</div>
        </div>
      </div>

      {/* Основная шапка */}
      <div className="max-w-6xl mx-auto px-4 h-24 flex items-center justify-between gap-4">
        
        {/* ЛЕВАЯ ЧАСТЬ: ТЕЛЕФОН */}
        <div className="hidden lg:flex flex-col text-left">
          <span className="text-xs text-gray-500 font-medium">Единый номер для записи:</span>
          <a href="tel:+78412995801" className="text-lg font-bold text-slate-800 hover:text-blue-600 transition-colors">
            8 (841-2) 99-58-01
          </a>
        </div>

        {/* ЦЕНТРАЛЬНАЯ ЧАСТЬ: КРУПНОЕ НАЗВАНИЕ И ФРАНШИЗА */}
        <Link href="/" className="flex flex-col text-center flex-1 min-w-0">
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 uppercase">
            Медицинский центр «ЛДЦ «Здоровая Семья»
          </span>
          <span className="text-xs sm:text-sm font-bold text-teal-600 uppercase tracking-widest mt-0.5">
            Официальный партнёр независимой лаборатории Гемотест
          </span>
        </Link>

        {/* ПРАВАЯ ЧАСТЬ: ИНТЕГРАЦИЯ МЕДТОЧКИ И ГАМБУРГЕР */}
        <div className="flex items-center gap-3">
          {/* Контейнер, куда скрипт Medflex автоматически встроит кнопку */}
          <div className="hidden sm:block min-w-[150px]">
            <div 
              id="medflexMedtochkaWidgetButton"
              data-src="https://booking.medflex.ru/?user=38061275f1134bb6bb688d741b213f45"
            ></div>
          </div>

          {/* Мобильный гамбургер */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* НИЖНЯЯ ПАНЕЛЬ: НАВИГАЦИОННОЕ МЕНЮ (как на taomed.ru) */}
      <nav className="w-full bg-slate-50 border-t border-b border-gray-200 hidden md:block">
        <div className="max-w-3xl mx-auto flex justify-between items-center h-12 text-sm font-bold uppercase tracking-wider text-slate-700">
          <Link href="/#departments" className="hover:text-blue-600 transition-colors">Отделения</Link>
          <Link href="/#doctors" className="hover:text-blue-600 transition-colors">Врачи</Link>
          <Link href="/#services" className="hover:text-blue-600 transition-colors">Услуги</Link>
          <Link href="/contacts" className="hover:text-blue-600 transition-colors">Контакты</Link>
          <Link href="/license" className="hover:text-blue-600 transition-colors">Лицензия</Link>
        </div>
      </nav>

      {/* МОБИЛЬНОЕ МЕНЮ */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 flex flex-col gap-4 shadow-xl">
          <Link href="/#departments" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold text-slate-800">Отделения</Link>
          <Link href="/#doctors" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold text-slate-800">Врачи</Link>
          <Link href="/#services" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold text-slate-800">Услуги</Link>
          <Link href="/contacts" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold text-slate-800">Контакты</Link>
          <Link href="/license" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold text-slate-800">Лицензия</Link>
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <span className="text-xs text-gray-500">Запись по телефону:</span>
            <a href="tel:+78412995801" className="text-lg font-bold text-blue-600">8 (841-2) 99-58-01</a>
          </div>
        </div>
      )}
    </header>
  )
}