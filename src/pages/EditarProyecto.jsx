import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useProyectos from '../hooks/useProyectos'
import FormularioProyecto from '../components/FormularioProyecto';

const EditarProyecto = () => {
   // obtenemos el id de la url
   const params = useParams();

   const { obtenerProyecto, proyecto, cargando } = useProyectos()
  
   useEffect(() => {
      // usamos el hook para tener la data del proyecto
      obtenerProyecto(params.id)   
   }, [])

   const { nombre } = proyecto;

   

   return (
      cargando ? '...' :(
         <>
            <h1 className="font-black text-4xl"> <span className="text-sky-700">EditarProyecto</span>: {nombre}</h1>  
         
            <div className="mt-10 flex justify-center">
               <FormularioProyecto />
            </div>
         </>

      )      
   )
}

export default EditarProyecto