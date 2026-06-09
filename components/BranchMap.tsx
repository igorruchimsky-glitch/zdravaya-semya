'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Фикс бага Leaflet с путями к дефолтным иконкам маркеров в Next.js
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

L.Marker.prototype.options.icon = defaultIcon

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
  // Географический центр между Пензой и Заречным для оптимального дефолтного зума
  const centerPosition: [number, number] = [53.2007, 44.9800] 

  return (
    <MapContainer 
      center={centerPosition} 
      zoom={11} 
      scrollWheelZoom={false} // Защита от случайного скролла карты при прокрутке страницы
      className="h-full w-full"
    >
      {/* Используем качественную и легкую подложку карт от OpenStreetMap */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Динамический рендеринг маркеров всех филиалов ЛДЦ из базы данных */}
      {branches
        .filter(branch => branch.lat && branch.lng) // Исключаем филиалы с незаполненными координатами
        .map((branch) => (
          <Marker key={branch.id} position={[branch.lat, branch.lng]}>
            <Popup>
              <div className="p-1 space-y-1 text-slate-900">
                <h4 className="font-bold text-sm text-primary">{branch.name}</h4>
                <p className="text-xs font-medium leading-tight">{branch.address}</p>
                <div className="pt-1 text-[11px] text-muted-foreground border-t border-slate-100">
                  Регион: Пензенская область
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  )
}