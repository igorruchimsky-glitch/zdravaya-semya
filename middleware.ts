import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''

  // 1. Оптимизированный редирект с www на без-www для основного продакшен-домена
  if (host === 'www.zsemya.ru') {
    const url = request.nextUrl.clone()
    url.host = 'zsemya.ru'
    
    // Используем протокол из текущего запроса (безопасно для локальной разработки и https продакшена)
    url.protocol = request.nextUrl.protocol 
    
    // 308 редирект идеален для SEO: он сохраняет метод запроса (POST/GET) в отличие от 301
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

// 2. Критически важный фильтр (Matcher): Middleware не должен трогать статику
export const config = {
  matcher: [
    /*
     * Исключаем внутренние пути Next.js и статические файлы:
     * - _next/static (статические скрипты и стили)
     * - _next/image (оптимизированные изображения)
     * - favicon.ico, sitemap.xml, robots.txt (системные файлы)
     * - файлы с расширениями картинок/шрифтов (svg, png, jpg, woff2 и т.д.)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2|woff|ttf)$).*)',
  ],
}