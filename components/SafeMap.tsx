'use client'

import dynamic from 'next/dynamic'

// Переносим динамический импорт с ssr: false сюда, где 'use client' легитимен
const BranchMap = dynamic(() => import('@/components/BranchMap'), {
  ssr: false,
  loading: () => (
    <div className="text-center py-40 text-muted-foreground text-sm">
      Интерактивная карта загружается...
    </div>
  ),
})

export default function SafeMap({ branches }: { branches: any[] }) {
  return <BranchMap branches={branches} />
}