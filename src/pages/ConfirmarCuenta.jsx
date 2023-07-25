import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

import Alerta from '../components/Alerta'

const ConfirmarCuenta = () => {

   // States
   const [alerta, setAlerta] = useState({})
   const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

   // obtenemos el token de la URL
   const params = useParams()
   const { id } = params

   //hacemos la peticion para validar token 
   useEffect(() => {
      const confirmarCuenta = async() => {
         try {
            const url = `http://localhost:4000/api/usuarios/confirmar/${id}`;
            const { data } = await axios.get(url)
            console.log(data)

            setAlerta({
               msg: data.msg,
               error: false,
            })

            setCuentaConfirmada(true)

         } catch (error) {
            setAlerta({
               msg: error.response.data.msg,
               error: true
            })
         }
      }
      confirmarCuenta()
   }, [id])

   // extraemos el mensaje d ela alerta
   const { msg } = alerta;

   return (
      <>
         <h1 className="text-sky-600 font-black text-5xl capitalize">Confirma tu Cuenta y Comienza a Crear tus {' '}
            <span className="text-slate-700">Proyectos</span>
         </h1>

         <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
            { msg && <Alerta alerta={alerta} /> }

            { cuentaConfirmada && (
               <Link
                  className='block text-center my-3 text-slate-500 uppercase text-sm'
                  to="/"
               >Inicia Sesión</Link>
            )}
         </div>
      </>
   )
}

export default ConfirmarCuenta