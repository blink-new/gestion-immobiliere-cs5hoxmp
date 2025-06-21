import React, { useState } from 'react'
import { Agenda } from './components/Agenda'

function App() {
  // Mock user role for testing, change to 'locataire' to test exclusion
  const [userRole] = useState('proprietaire')

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Agenda userRole={userRole} />
    </div>
  )
}

export default App