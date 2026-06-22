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

interface Appointment {
  id: number
  patient_name: string
  patient_phone: string
  preferred_date: string
  status: string
  created_at: string
  ветви?: {
    Имя: string
  } | null
}

export default function AdminPage() {
  const [password, setPassword] = useState<string>('')
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const savedPassword = sessionStorage.getItem('admin_token')
    if (savedPassword) {
      fetchAppointments(savedPassword)
    }
  }, [])

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
        sessionStorage.setItem('admin_token', token)
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

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    if (!password.trim()) {
      setError('Пароль не может быть пустым')
      return
    }
    fetchAppointments(password)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token')
    setAuthenticated(false)
    setAppointments([])
    setPassword('')
  }

  // Вспомогательная функция для красивого парсинга имени, врача и услуги
  const parsePatientData = (fullNameString: string) => {
    const match = fullNameString.match(/(.*?)\[Врач:\s*(.*?)\s*\|\s*Услуга:\s*(.*?)\s*\]/)
    if (match) {
      return {
        name: match[1].trim(),
        doctor: match[2].trim(),
        service: match[3].trim(),
        hasMeta: true
      }
    }
    return { name: fullNameString, doctor: '', service: '', hasMeta: false }
  }

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
            <Button type="submit" disabled={loading} className="w-full bg-slate-900 hover:bg-slate-800 text-white">
              {loading ? 'Проверка...' : 'Войти'}
            </Button>
          </form>
        </div>
      </main>
    )
  }

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
        <div className="rounded-md border bg-card overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead className="min-w-[250px]">Пациент / Направление</TableHead>
                <TableHead>Телефон</TableHead>
                <TableHead>Желаемая дата</TableHead>
                <TableHead>Отделение</TableHead>
                <TableHead className="w-[120px]">Статус</TableHead>
                <TableHead className="text-right">Создано</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((app) => {
                const parsed = parsePatientData(app.patient_name)
                // Берем название из кириллической связи таблиц Supabase
const branchName = app.ветви?.Имя || '—'

                return (
                  <TableRow key={app.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {app.id}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-slate-900">{parsed.name}</div>
                      {parsed.hasMeta && (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          <Badge variant="secondary" className="bg-teal-50 text-teal-700 hover:bg-teal-50 border-teal-200 text-[11px] px-1.5 py-0">
                            🔬 {parsed.service}
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200 text-[11px] px-1.5 py-0">
                            👨‍⚕️ {parsed.doctor}
                          </Badge>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-slate-700">{app.patient_phone}</TableCell>
                    <TableCell className="text-slate-700">{app.preferred_date}</TableCell>
                    <TableCell className="text-slate-600 text-sm">{branchName}</TableCell>
                    <TableCell>
                      <Badge variant={app.status === 'new' ? 'default' : 'secondary'} className={app.status === 'new' ? 'bg-emerald-600 text-white' : ''}>
                        {app.status === 'new' ? 'Новая' : app.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      {new Date(app.created_at).toLocaleString('ru-RU')}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </main>
  )
}