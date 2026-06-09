import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { patient_name, patient_phone, preferred_date, branch_name } = body

    // 1. Строгая валидация входящих данных на бэкенде (Защита от спам-ботов)
    if (!patient_name?.trim() || !patient_phone?.trim()) {
      return NextResponse.json({ error: 'Имя и телефон обязательны для заполнения' }, { status: 400 })
    }

    // Ограничиваем длину строк, чтобы избежать переполнения буфера и спама в чат
    const cleanName = patient_name.trim().substring(0, 100)
    const cleanPhone = patient_phone.trim().substring(0, 30)
    const cleanDate = (preferred_date || 'Не указана').trim().substring(0, 50)
    const cleanBranch = (branch_name || 'Не указано').trim().substring(0, 100)

    // 2. Проверка конфигурации переменных окружения
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      console.error('[CONFIG ERROR]: Telegram credentials missing in environment variables.')
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }

    // 3. Формирование безопасного шаблона сообщения
    const message = [
      `🆕 *Новая запись на приём!*`,
      `👤 *Имя:* ${cleanName}`,
      `📞 *Телефон:* \`${cleanPhone}\``, // Форматируем как код для быстрого копирования в один клик
      `📅 *Дата:* ${cleanDate}`,
      `🏥 *Отделение:* ${cleanBranch}`
    ].join('\n')

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`

    // 4. Отправка запроса в Telegram API с поддержкой Markdown
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown', // Включает красивую разметку жирного текста и кода
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[TELEGRAM API ERROR]:', errorText)
      // Возвращаем true фронтенду, даже если упал Telegram, 
      // чтобы пациент не видел ошибку, ЕСЛИ запись уже успешно сохранилась в базу данных.
      return NextResponse.json({ error: 'Notification failed' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('[NOTIFICATION ROUTE CRASH]:', err?.message || err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}