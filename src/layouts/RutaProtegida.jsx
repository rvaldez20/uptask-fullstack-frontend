import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Proyectos from '../pages/Proyectos';


const RutaProtegida = () => {

   const { auth, cargando } = useAuth();
 
   // console.log(auth)
   // if(cargando) return 'Cargando....'

   return (
      <>
         { auth._id ? <Outlet /> : <Navigate to="/" />}
      </>
   )
}

export default RutaProtegida