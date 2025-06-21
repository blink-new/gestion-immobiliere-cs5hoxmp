import React, { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { MainContent } from './components/MainContent'

function App() {
  // Mock user role for testing, change to 'locataire' to test exclusion
  const [userRole] = useState('proprietaire')
  const [page, setPage] = useState('agenda')

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar active={page} onNavigate={setPage} userRole={userRole} />
      <MainContent page={page} userRole={userRole} />
    </div>
  )
}

export default App