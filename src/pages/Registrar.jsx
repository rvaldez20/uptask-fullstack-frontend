import { Link } from 'react-router-dom'


const Registrar = () => {
   return (
      <>
         <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu Cuenta y Administra tus {' '}
            <span className="text-slate-700">Proyectos</span>
         </h1>

         <form className="my-10 bg-white shadow rounded-lg p-10">

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