import { useState } from 'react'

import Alerta from '../components/Alerta'
import useProyectos from '../hooks/useProyectos'

const FormularioProyecto = () => {
   // States
   const [nombre, setNombre] = useState('')
   const [descripcion, setDescripcion] = useState('')
   const [fechaEntrega, setFechaEntrega] = useState('')
   const [cliente, setCliente] = useState('')

   const {mostrarAlerta, alerta, submitProyecto} = useProyectos();

   const handleSubmit = async(e) => {
      e.preventDefault();

      if([nombre, descripcion, fechaEntrega, cliente].includes('')) {
         mostrarAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true,
         })         
         return
      }

      // pasar los datos hacia el provider(el proyecto)
      await submitProyecto({ nombre, descripcion, fechaEntrega, cliente });

      // reseteamos el formulario
      setNombre('')
      setDescripcion('')
      setFechaEntrega('')
      setCliente('')      
   }

   const { msg } = alerta;

   return (
             
      <form
         onSubmit={ handleSubmit }
         className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      >
         
         { msg && <Alerta alerta={alerta} />}

         <div className='mb-5'>
            <label 
               className="text-gray-700 uppercase font-bold text-sm"
               htmlFor="nombre"
            >Nombre Proyecto</label>
            <input 
               id="nombre"
               type="text"
               className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
               placeholder="Nombre del Proyecto"
               value={nombre}
               onChange={e => setNombre(e.target.value)}
            />
         </div>

         <div className='mb-5'>
            <label 
               className="text-gray-700 uppercase font-bold text-sm"
               htmlFor="descripcion"
            >Descripción</label>
            <textarea 
               id="descripcion"
               className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
               placeholder="Descripción del Proyecto"
               rows="6"
               value={descripcion}
               onChange={e => setDescripcion(e.target.value)}
            />
         </div>

         <div className='mb-5'>
            <label 
               className="text-gray-700 uppercase font-bold text-sm"
               htmlFor="fecha-entrega"
            >Fecha de Entrega</label>
            <input 
               id="fecha-entrega"
               type='date'
               className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"     
               value={fechaEntrega}
               onChange={e => setFechaEntrega(e.target.value)}
            />
         </div>

         <div className='mb-5'>
            <label 
               className="text-gray-700 uppercase font-bold text-sm"
               htmlFor="cliente"
            >Nombre del Cliente</label>
            <input 
               id="cliente"
               type="text"
               className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
               placeholder="Nombre del Cliente"
               value={cliente}
               onChange={e => setCliente(e.target.value)}
            />
         </div>

         <input 
            type="submit" 
            value="Crear Proyecto"
            className='bg-sky-600 p-3 text-white w-full uppercase font-bold rounded cursor-pointer hover:bg-sky-700 transition-colors'
         />
         
      </form>

   )
}

export default FormularioProyecto