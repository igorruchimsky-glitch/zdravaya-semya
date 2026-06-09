import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

// Принудительно отключаем кэширование роута, чтобы данные всегда были актуальными
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    const expectedPassword = process.env.ADMIN_PASSWORD

    // 1. Проверяем конфигурацию сервера
    if (!expectedPassword) {
      console.error('[ADMIN API ERROR]: ADMIN_PASSWORD environment variable is not defined.')
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }

    // 2. Проверяем наличие и формат заголовка
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]

    // 3. Проверка авторизации
    if (token !== expectedPassword) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // 4. Запрос к Supabase с JOIN связью
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        id,
        patient_name,
        patient_phone,
        preferred_date,
        status,
        created_at,
        branches (
          name
        )
      `)
      .order('created_at', { ascending: false })

    // 5. Обработка ошибок БД без утечки системной информации наружу
    if (error) {
      console.error('[SUPABASE FETCH ERROR]:', error.message, error.details)
      return NextResponse.json({ error: 'Failed to fetch appointments data' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err: any) {
    console.error('[ADMIN API CRASH]:', err?.message || err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}