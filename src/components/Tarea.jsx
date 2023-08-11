import { formatearFecha } from '../helpers/formatearFecha';
import useProyectos from '../hooks/useProyectos'
import useAdmin from '../hooks/useAdmin';

const Tarea = ({tarea}) => {

   const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos()
   const admin = useAdmin()

   // console.log(tarea)
   const { descripcion, nombre, prioridad, fechaEntrega, _id, estado } = tarea;

   return (
      <div className="border-b p-5 flex justify-between items-center">
         <div className="flex flex-col items-start">
            <p className="mb-1 text-xl">{nombre}</p>
            <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
            <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
            <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>

            {estado && <p className="text-xs bg-green-600 uppercase px-2 py-1 rounded-lg text-white font-bold">Completada por: {tarea.completado.nombre} </p>}

         </div>

         <div className="flex gap-2">
            { 
               admin && (
                  <button
                     className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                     onClick={ () => handleModalEditarTarea(tarea) }
                  >Editar</button>
            )}

          
            <button
               onClick={() => completarTarea(_id)}
               className={`${estado ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}                           
            >{estado ? 'Completa' : 'Incompleta'}</button>


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