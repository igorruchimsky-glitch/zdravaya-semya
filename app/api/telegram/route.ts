import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, phone, department, message } = await request.json()

    // Токен и ID чата берутся из переменных окружения (.env) для безопасности по ТЗ
    const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

    if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json({ error: 'Telegram credentials missing' }, { status: 500 })
    }

    // Формируем структурированный текст сообщения для администратора клиники
    const text = `🚨 *Новая заявка с сайта ЛДЦ*\n\n` +
                 `👤 *Имя:* ${name}\n` +
                 `📞 *Телефон:* ${phone}\n` +
                 `🏥 *Отделение:* ${department}\n` +
                 `✉️ *Комментарий:* ${message || 'Не указан'}`

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'Markdown',
      }),
    })

    if (res.ok) {
      return NextResponse.json({ success: true }, { status: 200 })
    } else {
      return NextResponse.json({ error: 'Failed to send to Telegram' }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}