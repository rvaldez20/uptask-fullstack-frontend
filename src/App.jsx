import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'

import Login from './pages/Login'
import Registrar from './pages/Registrar'
import OlvidePassword from './pages/OlvidePassword'
import NuevoPassword from './pages/NuevoPassword'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import Proyectos from './pages/Proyectos'
import NuevoProyecto from './pages/NuevoProyecto'


import { AuthProvider } from './context/AuthProvider'

// console.log(import.meta.env.VITE_BACKEND_URL) // acceso a las variables de entorno en VITE

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route path="/" element={<AuthLayout />} >
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="olvide-password/:token" element={<NuevoPassword />} />
            <Route path="confirmar/:id" element={<ConfirmarCuenta />} />    
          </Route>

          <Route path="/proyectos" element={<RutaProtegida />} >
            <Route index element={<Proyectos />} />
            <Route path="crear-proyecto" element={<NuevoProyecto />} />
          </Route>
            
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
