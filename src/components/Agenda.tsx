import React, { useState } from "react"
import { Calendar } from "./ui/calendar"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

interface Event {
  id: number
  title: string
  description: string
  date: string // ISO date string yyyy-mm-dd
}

interface AgendaProps {
  userRole: string
}

export function Agenda({ userRole }: AgendaProps) {
  // Hooks must be called unconditionally
  const [selectedDay, setSelectedDay] = useState<string>(new Date().toISOString().slice(0, 10))
  const [events, setEvents] = useState<Event[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")

  const eventsForSelectedDay = events.filter(e => e.date === selectedDay)

  if (userRole === "locataire") {
    return <p className="text-center text-muted-foreground mt-10">Agenda non disponible pour ce profil.</p>
  }

  function handleAddEvent() {
    if (!newTitle.trim()) return
    const newEvent: Event = {
      id: Date.now(),
      title: newTitle.trim(),
      description: newDescription.trim(),
      date: selectedDay,
    }
    setEvents(prev => [...prev, newEvent])
    setNewTitle("")
    setNewDescription("")
    setIsDialogOpen(false)
  }

  return (
    <div className="max-w-screen-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Agenda</h2>
      <Calendar
        mode="single"
        selected={new Date(selectedDay)}
        onSelect={(day) => {
          if (day) setSelectedDay(day.toISOString().slice(0, 10))
        }}
      />

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Événements du {selectedDay}</h3>
        {eventsForSelectedDay.length === 0 ? (
          <p className="text-muted-foreground mt-2">Aucun événement ce jour.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {eventsForSelectedDay.map(event => (
              <li key={event.id} className="border rounded p-3 shadow-sm">
                <h4 className="font-semibold">{event.title}</h4>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mt-6">Ajouter un événement</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nouvel événement</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={e => {
              e.preventDefault()
              handleAddEvent()
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="title" className="block font-medium mb-1">
                Titre
              </label>
              <Input
                id="title"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="description" className="block font-medium mb-1">
                Description
              </label>
              <Textarea
                id="description"
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Ajouter</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}