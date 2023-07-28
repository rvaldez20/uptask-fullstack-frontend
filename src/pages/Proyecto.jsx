import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos';

const Proyecto = () => {
   // obenemos el id del pryecto que queremos visaulizar
   const params = useParams();
   

   const { obtenerProyecto, proyecto, cargando } = useProyectos();         

   useEffect(() => {
      // usamos el hook para tener acceso a la funcion obtenerProyecto
      obtenerProyecto(params.id)   

   }, [])

   console.log(proyecto)
   const { nombre } = proyecto


   return ( 

      cargando ? '...' : (
         <div>
            <h1 className="font-black text-4xl">{nombre}</h1>
         </div>   
      )

      
   )
}

export default Proyecto