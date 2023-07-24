

const NuevoPassword = () => {
   return (
      <>
         <h1 className="text-sky-600 font-black text-5xl capitalize">Restablece tu Password y no Pierdas Acceso a tus {' '}
            <span className="text-slate-700">Proyectos</span>
         </h1>

         <form className="my-10 bg-white shadow rounded-lg p-10">            
            
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
               />
            </div>          

            <input 
               type="submit"
               value="Guardar Nuevo Password"
               className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
         </form>
        
      </>
   )
}

export default NuevoPassword