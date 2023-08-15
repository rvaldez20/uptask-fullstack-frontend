import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import FormularioColaborador from "../components/FormularioColaborador"
import useProyectos from "../hooks/useProyectos"
import Alerta from '../components/Alerta'



const NuevoColaborador = () => {
   // context 
   const { obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, alerta } = useProyectos();

   const params = useParams();
   // console.log(params)

   // Effect
   useEffect(() => {
      obtenerProyecto(params.id)
   }, [])
   
   // if(cargando) return 'Cargando...'
   if(!proyecto?._id) return <Alerta alerta={alerta} />

   return (
      <>
         <h1 className="text-4xl font-black">Añadir Colaborador(a) al Proyecto: <span className="text-sky-700">{proyecto.nombre}</span> </h1>

         <div className="mt-10 flex justify-center">
            <FormularioColaborador />
         </div>

         {cargando ? <p className="text-center mt-5">Cargando...</p> : colaborador?._id && (
            <div className="flex justify-center mt-10">
               <div className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow">
                  <h2 className="text-center mb-10 text-2xl fond-bold">Resultado:</h2>
                  <div className="flex justify-between items-center">
                     <p>{colaborador.nombre}</p>
                     
                     <button
                        onClick={ () => agregarColaborador({
                           email: colaborador.email
                        }) }
                        type='button'
                        className='bg-slate-500 px-5 py-2 rounded uppercase text-white font-bold text-sm'
                     >Agregar al Proyecto</button>
                  </div>
               </div>
            </div>   
         )}

      </>
   )
}

export default NuevoColaborador