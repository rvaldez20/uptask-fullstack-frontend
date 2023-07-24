import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Alerta from '../components/Alerta'


const Registrar = () => {

   //! States
   const [nombre, setNombre] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [repetirPassword, setRepetirPassword] = useState('')
   const [alerta, setAlerta] = useState({})

   //! methos for events
   const handleSubmit = async e => {
      e.preventDefault()

      // validamos que todos los campos tiene informacion
      if([nombre, email, password, repetirPassword].includes('')) {
         setAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true,
         })
         return
      }

      // validamos que los password sean iguales
      if(password !== repetirPassword){
         setAlerta({
            msg: 'Los Password no son iguales',
            error: true,
         })
         return
      }

      // validamos que el password tenga al menos 6 caracteres
      if(password.length < 6){
         setAlerta({
            msg: 'El Password es muy corto, deb ser de almenos 6 caracteres',
            error: true,
         })
         return
      }

      // si pasa todas las validaciones seteamso la alerta y creamos el usuario con la API
      setAlerta({})

      //TODO crear el usuario
      try {
         const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`, { 
            nombre, 
            email, 
            password 
         })
         
         setAlerta({
            msg: data.msg,
            error: false
         })

         // quiere decir que ya se creo el usuario y limpiamos el formulario
         setNombre('')
         setEmail('')
         setPassword('')
         setRepetirPassword('')

      } catch (error) {
         // console.log(error.response.data.msg) // mensaje de error del controlador del backend
         setAlerta({
            msg: error.response.data.msg,
            error: true
         })

         setPassword('')
         setRepetirPassword('')
      }
      
   }

   // extraemos el mensaje d ela alerta
   const { msg } = alerta;

   return (
      <>
         <h1 className="text-sky-600 font-black text-5xl capitalize">Crea tu Cuenta y Administra tus {' '}
            <span className="text-slate-700">Proyectos</span>
         </h1>

         {msg && <Alerta alerta={alerta} />}

         <form 
            className="my-10 bg-white shadow rounded-lg p-10"      
            onSubmit={ handleSubmit }
         >

            <div className="my-5">
               <label 
                  className="uppercase text-gray-600 block text-xl font-bold"                   
                  htmlFor="nombre"
               >Nombre</label>
               <input 
                  className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
                  type="nombre"
                  placeholder="Tu Nombre"
                  id="nombre"
                  value={ nombre }
                  onChange={ e => setNombre(e.target.value) }
               />
            </div>

            <div className="my-5">
               <label 
                  className="uppercase text-gray-600 block text-xl font-bold"                   
                  htmlFor="email"
               >Email</label>
               <input 
                  className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
                  type="email"
                  placeholder="Email de Registro"
                  id="email"
                  value={ email }
                  onChange={ e => setEmail(e.target.value) }
               />
            </div>

            <div className="my-5">
               <label 
                  className="uppercase text-gray-600 block text-xl font-bold"                   
                  htmlFor="password"
               >Password</label>
               <input 
                  className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
                  type="password"
                  placeholder="Password de Registro"
                  id="password"
                  value={ password }
                  onChange={ e => setPassword(e.target.value) }
               />
            </div>

            <div className="my-5">
               <label 
                  className="uppercase text-gray-600 block text-xl font-bold"                   
                  htmlFor="password2"
               >Repetir Password</label>
               <input 
                  className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
                  type="password"
                  placeholder="Repetir Password"
                  id="password2"
                  value={ repetirPassword }
                  onChange={ e => setRepetirPassword(e.target.value) }
               />
            </div>

            <input 
               type="submit"
               value="Crear Cuenta"
               className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
         </form>

         <nav className="lg:flex lg:justify-between">
            <Link
               className='block text-center my-3 text-slate-500 uppercase text-sm'
               to="/"
            >¿Ya tienes una cuenta? Inicia Sesión</Link>

            <Link
               className='block text-center my-3 text-slate-500 uppercase text-sm'
               to="/olvide-password"
            >Olvide mi Password</Link>
         </nav>
      </>
   )
}

export default Registrar