import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Alerta from '../components/Alerta'


const NuevoPassword = () => {

   //states
   const [alerta, setAlerta] = useState({})
   const [tokenValido, setTokenValido] = useState(false)
   const [password, setPassword] = useState('')
   const [passwordModificado, setPasswordModificado] = useState(false)

   const params = useParams();
   const {token} = params

   useEffect(() => {
      const comprobarToken = async () => {
         try {            
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${token}`)
            setTokenValido(true)

         } catch (error) {
            setAlerta({
               msg: error.response.data.msg,
               error: true
            })
         }
      }
      comprobarToken()
   }, [])

   const handleSubmit = async(e) => {
      e.preventDefault();

      if(password.length < 6) {
         setAlerta({
            msg: 'El Password debe ser de almenos 6 caracteres',
            error: true
         })
         return
      }

      try {
         const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${token}`;
         const { data } = await axios.post(url, {password})

         setPassword('');
         setTokenValido(false)
         setPasswordModificado(true);

         setAlerta({
            msg: data.msg,
            error: false
         })
         return

      } catch (error) {
         setAlerta({
            msg: error.response.data.msg,
            error: true
         })
      }
   }

   const { msg } = alerta;

   return (
      <>
         <h1 className="text-sky-600 font-black text-5xl capitalize">Restablece tu Password y no Pierdas Acceso a tus {' '}
            <span className="text-slate-700">Proyectos</span>
         </h1>

         { msg && <Alerta alerta={alerta} />}

         { tokenValido && (
            <form 
               onSubmit={ handleSubmit }
               className="my-10 bg-white shadow rounded-lg p-10"
            >                        
               <div className="my-5">
                  <label 
                     className="uppercase text-gray-600 block text-xl font-bold"                   
                     htmlFor="password"
                  >Nuevo Password</label>
                  <input 
                     className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
                     type="password"
                     placeholder="Escribe tu Nuevo Password"
                     id="password"
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                  />
               </div>          

               <input 
                  type="submit"
                  value="Guardar Nuevo Password"
                  className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
               />
            </form>   
         )}

         { passwordModificado && (
            <Link
               className='block text-center my-3 text-slate-500 uppercase text-sm'
               to="/"
            >Inicia Sesión</Link>
         )}
        
      </>
   )
}

export default NuevoPassword