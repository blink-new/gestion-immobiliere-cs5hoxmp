import React from "react"
import { Calendar, Home, User } from "lucide-react"

interface SidebarProps {
  active: string
  onNavigate: (page: string) => void
  userRole: string
}

const navItems = [
  { key: "home", label: "Accueil", icon: <Home size={20} /> },
  { key: "agenda", label: "Agenda", icon: <Calendar size={20} /> },
  // Ajoutez d'autres sections ici si besoin
]

export function Sidebar({ active, onNavigate, userRole }: SidebarProps) {
  return (
    <aside className="h-screen w-64 bg-white border-r flex flex-col justify-between shadow-sm">
      <div>
        <div className="px-6 py-6 flex items-center gap-2">
          <span className="font-bold text-xl tracking-tight text-blue-600">Gestion Immo</span>
        </div>
        <nav className="mt-8 flex flex-col gap-1">
          {navItems.map(item => (
            <button
              key={item.key}
              className={`flex items-center gap-3 px-6 py-3 text-base rounded-l-full transition-colors
                ${active === item.key ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => onNavigate(item.key)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="px-6 py-4 border-t flex items-center gap-2 text-gray-500">
        <User size={18} />
        <span className="text-sm">Profil: <span className="capitalize">{userRole}</span></span>
      </div>
    </aside>
  )
}
