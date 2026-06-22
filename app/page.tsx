import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Departments from '@/components/Departments'
import Doctors from '@/components/Doctors'
import Services from '@/components/Services'
import PriceList from '@/components/PriceList'
import Advantages from '@/components/Advantages'
import ReviewsAndPartner from '@/components/ReviewsAndPartner'
import BookingAndContacts from '@/components/BookingAndContacts'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans antialiased">
      {/* 1-2. Шапка сайта и Главный баннер */}
      <Header />
      <Hero />
      
      {/* 3. Блок «Наши отделения» */}
      <Departments />
      
      {/* 4. Блок «Наши врачи» */}
      <Doctors />
      
      {/* 5. Блок «Услуги и сервисы» */}
      <Services />
      
      {/* Подключаем новый интерактивный блок цен */}
      <PriceList />
      
      {/* 6. Блок «Преимущества» */}
      <Advantages />
      
      {/* 7. Блоки «Отзывы» и «О партнёре» */}
      <ReviewsAndPartner />
      
      {/* 8. Блок «Запись онлайн и контакты» (Medflex + Telegram API) */}
      <BookingAndContacts />
      
      {/* 9. Светлый подвал сайта */}
      <Footer />
    </main>
  )
}