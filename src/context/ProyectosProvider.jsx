import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {
   // states
   const [proyectos, setProyectos] = useState([])
   const [alerta, setAlerta] = useState({})

   // funcion para el manejo de alertas
   const mostrarAlerta = alerta => {
      setAlerta(alerta)

      // para desaparecer la alerta despues de 5 segundos
      setTimeout(() => {
         setAlerta({})
      }, 5000);
   }

   // 
   const submitProyecto = async (proyecto) => {
      console.log(proyecto)
   }

   return(
      <ProyectosContext.Provider
         value={{
            proyectos,
            mostrarAlerta,
            alerta,
            submitProyecto,
         }}
      >
         {children}
      </ProyectosContext.Provider>
   )
}

export {
   ProyectosProvider
}

export default ProyectosContext;