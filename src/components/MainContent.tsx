import React from "react"
import { Agenda } from "./Agenda"

interface MainContentProps {
  page: string
  userRole: string
}

export function MainContent({ page, userRole }: MainContentProps) {
  return (
    <main className="flex-1 p-8 bg-gray-50 min-h-screen">
      {page === "home" && (
        <div className="max-w-xl mx-auto mt-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Bienvenue sur votre espace de gestion immobilière</h1>
          <p className="text-gray-600">Utilisez le menu à gauche pour naviguer dans l'application.</p>
        </div>
      )}
      {page === "agenda" && <Agenda userRole={userRole} />}
    </main>
  )
}
