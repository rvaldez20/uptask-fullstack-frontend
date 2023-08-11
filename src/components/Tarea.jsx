import { formatearFecha } from '../helpers/formatearFecha';
import useProyectos from '../hooks/useProyectos'
import useAdmin from '../hooks/useAdmin';

const Tarea = ({tarea}) => {

   const { handleModalEditarTarea, handleModalEliminarTarea } = useProyectos()
   const admin = useAdmin()

   // console.log(tarea)
   const { descripcion, nombre, prioridad, fechaEntrega, _id, estado } = tarea;

   return (
      <div className="border-b p-5 flex justify-between items-center">
         <div>
            <p className="mb-1 text-xl">{nombre}</p>
            <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
            <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
            <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
         </div>

         <div className="flex gap-2">
            { 
               admin && (
                  <button
                     className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                     onClick={ () => handleModalEditarTarea(tarea) }
                  >Editar</button>
            )}

            {
               estado 
                  ? (
                        <button
                           className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"                           
                        >Completa</button>
                     )
                  :  (
                        <button
                           className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                        >Incompleta</button>
                     )
            }
            
            {
               admin && (                                 
                  <button
                     className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                     onClick={ () => handleModalEliminarTarea(tarea) }
                  >Eliminar</button>
               )
            }
         </div>
      </div>
   )
}

export default Tarea