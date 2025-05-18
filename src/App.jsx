import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes'
import { Link } from 'react-router-dom'

function App() {
  const elementRoutes = useRoutes(routes)

  return (
    <>
      {/* Enlace para navegar al feed */}
      <nav>
      </nav>

      {/* Rutas */}
      {elementRoutes}

      {/* Notificaciones */}
      <Toaster position='bottom-center' reverseOrder={false} />
    </>
  )
}

export default App
