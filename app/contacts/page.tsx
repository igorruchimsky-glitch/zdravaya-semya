import { Metadata } from 'next'
import { supabase } from '@/lib/supabaseClient'
import SafeMap from '@/components/SafeMap' // Импортируем нашу безопасную обертку
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export const metadata: Metadata = {
  title: 'Адреса и контакты отделений | ЛДЦ Здоровая Семья',
  description: 'Контакты, телефоны и режим работы медицинских центров «Здоровая Семья» в Пензе и Заречном. Схема проезда и интерактивная карта отделений.',
  openGraph: {
    title: 'Контакты ЛДЦ Здоровая Семья',
    description: 'Режим работы и адреса наших медицинских отделений.',
    type: 'website',
  },
}

export const revalidate = 3600 // Пересчитывать кэш страницы раз в час

interface Branch {
  id: number
  name: string
  address: string
  phone: string
  working_hours: string
}

export default async function ContactsPage() {
  const { data: branches, error } = await supabase
    .from('branches')
    .select('id, name, address, phone, working_hours')

  if (error) {
    console.error('[SUPABASE CONTACTS FETCH ERROR]:', error.message)
  }

  const hasBranches = branches && branches.length > 0

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Наши отделения
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Информация о филиалах медицинского центра, графике работы и контактных телефонах.
        </p>
      </div>

      {/* Блок интерактивной карты через безопасную обертку */}
      <div className="h-96 w-full rounded-xl overflow-hidden border shadow-sm bg-muted">
        <SafeMap branches={branches || []} />
      </div>

      {/* Сетка карточек отделений */}
      {!hasBranches ? (
        <Alert variant="destructive">
          <AlertTitle>Внимание</AlertTitle>
          <AlertDescription>
            Не удалось загрузить список отделений. Пожалуйста, свяжитесь с нами по общему телефону или зайдите позже.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {branches.map((branch: Branch) => (
            <Card key={branch.id} className="overflow-hidden transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold tracking-tight text-primary">
                  {branch.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground font-medium">📍 Адрес:</p>
                  <p className="text-foreground font-semibold">{branch.address}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-muted-foreground font-medium">📞 Телефон:</p>
                  <p className="text-foreground font-mono font-semibold">{branch.phone}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-muted-foreground font-medium">🕒 Режим работы:</p>
                  <p className="text-foreground whitespace-pre-line">{branch.working_hours}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}