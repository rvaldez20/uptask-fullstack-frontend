import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos';

const Proyecto = () => {
   // obenemos el id del pryecto que queremos visaulizar
   const params = useParams();
   

   const { obtenerProyecto } = useProyectos();      

   useEffect(() => {
      // usamos el hook para tener acceso a la funcion obtenerProyecto
      obtenerProyecto(params.id)   

   }, [])


   return (
      <div>Proyecto</div>
   )
}

export default Proyecto