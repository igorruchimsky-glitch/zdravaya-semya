'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Фикс путей к иконкам Leaflet (оставляем проверенное вами решение, убрав лишнее)
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  })
}

type Branch = {
  id: number
  name: string
  address: string
  lat: number
  lng: number
}

interface MapClientProps {
  branches: Branch[]
}

export default function MapClient({ branches }: MapClientProps) {
  // Географический центр между Пензой и Заречным
  const defaultCenter: [number, number] = [53.2000, 44.9800]

  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={11} 
      scrollWheelZoom={false} // Защита от случайного захвата скролла на мобильных устройствах
      className="h-full w-full" // Контейнер наследует размеры родительского блока скругленной карты
    >
      <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
      />
      
      {/* Безопасный рендеринг маркеров с валидацией координат */}
      {branches
        ?.filter((branch) => branch && branch.lat !== undefined && branch.lng !== undefined && branch.lat !== null && branch.lng !== null)
        .map((branch) => (
          <Marker key={branch.id} position={[branch.lat, branch.lng]}>
            <Popup minWidth={200}>
              <div className="p-1 space-y-1 text-slate-900 font-sans">
                <strong className="block text-sm font-bold text-primary">
                  {branch.name}
                </strong>
                <p className="text-xs text-muted-foreground leading-normal">
                  {branch.address}
                </p>
                <div className="pt-1.5 mt-1 border-t border-slate-100 text-[10px] text-slate-400">
                  ЛДЦ «Здоровая Семья»
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  )
}