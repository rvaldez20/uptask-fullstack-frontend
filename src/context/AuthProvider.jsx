import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {

   const [auth, setAuth] = useState({});

   useEffect(() => {      
      const autenticarUsuario = async () => {
         const token = localStorage.getItem('token')
         
         // verificamos si tenemos un token en localstorage
         if(!token) {
            return;
         }

         const configAuth = {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
            }
         }

         try {
            // hacemos el request a la API end-point perfil y obtenemos la info del usuario
            const { data } = await clienteAxios.get('/usuarios/perfil', configAuth)

            // colocamos la respuesta en el state auth
            setAuth(data)

         } catch (error) {
            console.log(error)
         }
         
      }
      autenticarUsuario();
   }, [])
   

   return (
      <AuthContext.Provider 
         value={{
            auth,
            setAuth,                        
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