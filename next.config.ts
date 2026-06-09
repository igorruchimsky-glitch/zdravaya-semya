import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. Оптимизация сборки и компиляции */
  reactStrictMode: true, // Включает строгий режим React для поиска скрытых багов гидратации
  poweredByHeader: false, // Отключает заголовок X-Powered-By (скрывает, что сайт работает на Next.js, усложняя аутентификацию злоумышленникам)

  /* 2. Оптимизация импорта тяжелых пакетов */
  experimental: {
    // Автоматически импортирует только те иконки и компоненты, которые реально используются на страницах
    optimizePackageImports: ["lucide-react", "@radix-ui/react-select", "@radix-ui/react-dialog"],
  },

  /* 3. Конфигурация безопасности внешних изображений (White List) */
  images: {
    formats: ['image/avif', 'image/webp'], // Включаем современные форматы сжатия без потери качества
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdnjs.cloudflare.com', // Разрешаем ресурсы для стилей и иконок Leaflet
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unpkg.com', // Резервный CDN для картографии
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co', // Разрешаем загрузку картинок и документов из вашего Storage Supabase
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },

  /* 4. Настройка заголовков безопасности (HTTP Headers) */
  async headers() {
    return [
      {
        source: '/((?!api|_next/static|_next/image|favicon.ico).*)', // Применяем ко всем страницам, кроме статики и API
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Защита от кликджекинга (запрещает встраивать сайт в iframe на чужих доменах)
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Запрещает браузеру угадывать MIME-типы файлов
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // Контроль передачи реферера при переходах
          },
        ],
      },
    ];
  },
};

export default nextConfig;