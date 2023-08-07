import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {

   const [auth, setAuth] = useState({});
   const [cargando, setCargando] = useState(true);

   const navigate = useNavigate();

   // se usa para comprobar que hay un token en el localstorage y hacer la autenticacion
   useEffect(() => {      
      const autenticarUsuario = async () => {
         const token = localStorage.getItem('token')         
         
         // verificamos si tenemos un token en localstorage
         if(!token) {
            setCargando(false);
            return;
         }         

         const config = {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
            }
         }

         try {
            // hacemos el request a la API end-point perfil y obtenemos la info del usuario
            const { data } = await clienteAxios.get('/usuarios/perfil', config)            

            // colocamos la respuesta en el state auth
            setAuth(data)

            // redireccionamos a /proyectos
            // navigate('/proyectos')
         } catch (error) {
            // setAuth({})
         } finally {
            setCargando(false);           
         }         
      }
      autenticarUsuario();
   }, [])
   

   return (
      <AuthContext.Provider 
         value={{
            auth,
            setAuth,
            cargando,
         }}
      >
         {children}
      </AuthContext.Provider>
   )
}

export {
   AuthProvider
}

export default AuthContext;