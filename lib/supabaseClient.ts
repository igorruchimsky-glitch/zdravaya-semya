import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Превентивная проверка переменных окружения (Fail-Fast)
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Критическая ошибка: Отсутствуют переменные окружения NEXT_PUBLIC_SUPABASE_URL или NEXT_PUBLIC_SUPABASE_ANON_KEY. Проверьте файл .env.local или настройки деплоя.'
  )
}

// Расширяем глобальный объект NodeJS, чтобы сохранить инстанс в режиме разработки
const globalForSupabase = globalThis as unknown as {
  supabase: ReturnType<typeof createClient> | undefined
}

// Экспортируем синглтон-клиент для безопасной работы на фронтенде и бэкенде
export const supabase =
  globalForSupabase.supabase ?? createClient(supabaseUrl, supabaseAnonKey)

// Если мы находимся в режиме разработки, сохраняем инстанс в глобальную область видимости
if (process.env.NODE_ENV !== 'production') {
  globalForSupabase.supabase = supabase
}