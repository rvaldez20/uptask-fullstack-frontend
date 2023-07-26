import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'

const Login = () => {

   //states
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [alerta, setAlerta] = useState({})

   const handleSubmit = async(e) => {
      e.preventDefault();

      if([email, password].includes('')) {
         setAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true
         })
         return;
      }
      

      try {
         const { data } = await clienteAxios.post('/usuarios/login', { email, password })         
         console.log(data)

         // ocultamos las alertas
         setAlerta({})

         // guardamos el token en localstorage
         localStorage.setItem('token', data.token)
         
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
         <h1 className="text-sky-600 font-black text-5xl capitalize">Inicia sesión y administra tus {' '}
            <span className="text-slate-700">Proyectos</span>
         </h1>

         { msg && <Alerta alerta={alerta} />}

         <form 
            onSubmit={ handleSubmit }
            className="my-10 bg-white shadow rounded-lg p-10"
         >
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

            <input 
               type="submit"
               value="Iniciar Sesión"
               className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
         </form>

         <nav className="lg:flex lg:justify-between">
            <Link
               className='block text-center my-3 text-slate-500 uppercase text-sm'
               to="/registrar"
            >¿No tienes una cuenta? Registrate</Link>

            <Link
               className='block text-center my-3 text-slate-500 uppercase text-sm'
               to="/olvide-password"
            >Olvide mi Password</Link>
         </nav>
      </>
   )
}

export default Login