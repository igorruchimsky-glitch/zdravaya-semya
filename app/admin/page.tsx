'use client'

import { useState, useEffect, FormEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

// Строгая типизация данных для защиты от ошибок компиляции
interface Appointment {
  id: number
  patient_name: string
  patient_phone: string
  preferred_date: string
  status: string
  created_at: string
  branches?: {
    name: string
  } | null
}

export default function AdminPage() {
  const [password, setPassword] = useState<string>('')
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Проверяем наличие токена в сессии при первичной загрузке страницы
  useEffect(() => {
    const savedPassword = sessionStorage.getItem('admin_token')
    if (savedPassword) {
      fetchAppointments(savedPassword)
    }
  }, [])

  // Изолированная функция запроса к API
  const fetchAppointments = async (token: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (res.ok) {
        const data: Appointment[] = await res.json()
        setAppointments(data)
        setAuthenticated(true)
        sessionStorage.setItem('admin_token', token) // Сохраняем сессию
      } else {
        setError('Неверный пароль или доступ запрещен')
        sessionStorage.removeItem('admin_token')
      }
    } catch (err) {
      setError('Ошибка соединения с сервером')
    } finally {
      setLoading(false)
    }
  }

  // Обработчик отправки формы (по кнопке или нажатию Enter)
  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    if (!password.trim()) {
      setError('Пароль не может быть пустым')
      return
    }
    fetchAppointments(password)
  }

  // Функция выхода из панели
  const handleLogout = () => {
    sessionStorage.removeItem('admin_token')
    setAuthenticated(false)
    setAppointments([])
    setPassword('')
  }

  // Экран авторизации
  if (!authenticated) {
    return (
      <main className="container mx-auto p-4 max-w-md min-h-screen flex flex-col justify-center">
        <div className="border p-6 rounded-lg shadow-sm bg-card text-card-foreground">
          <h1 className="text-2xl font-bold mb-4 tracking-tight">Вход в админ-панель</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Введите административный пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full"
              />
            </div>
            {error && <p className="text-sm text-destructive font-medium">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Проверка...' : 'Войти'}
            </Button>
          </form>
        </div>
      </main>
    )
  }

  // Экран панели управления (Данные авторизованы)
  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Записи на приём</h1>
          <p className="text-muted-foreground text-sm">Управление текущими заявками пациентов</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Выйти
        </Button>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">Новых записей на приём не обнаружено.</p>
        </div>
      ) : (
        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Имя пациента</TableHead>
                <TableHead>Телефон</TableHead>
                <TableHead>Желаемая дата</TableHead>
                <TableHead>Отделение</TableHead>
                <TableHead className="w-[120px]">Статус</TableHead>
                <TableHead className="text-right">Создано</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {app.id}
                  </TableCell>
                  <TableCell className="font-medium">{app.patient_name}</TableCell>
                  <TableCell className="font-mono">{app.patient_phone}</TableCell>
                  <TableCell>{app.preferred_date}</TableCell>
                  <TableCell>{app.branches?.name || '—'}</TableCell>
                  <TableCell>
                    <Badge variant={app.status === 'new' ? 'default' : 'secondary'}>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">
                    {new Date(app.created_at).toLocaleString('ru-RU')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </main>
  )
}