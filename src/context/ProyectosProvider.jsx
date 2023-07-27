import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {
   // states
   const [proyectos, setProyectos] = useState([])
   const [alerta, setAlerta] = useState({})

   const navigate = useNavigate();

   useEffect(() => {
      const obtenerProyectos = async() => {
         try {
            //obtenemos el token
            const token = localStorage.getItem('token');

            // se valida que exista un token         
            if(!token) return


            // objeto de configuracion de los header 
            const config = {
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
               }
            }

            // hacemos el request para obtener los proyectos
            const { data } = await clienteAxios.get('/proyectos', config)
            
            // agregamos los proyectos al state
            setProyectos(data)

         } catch (error) {
            console.log(error)
         }
      }
      obtenerProyectos();
   }, [])
   

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
      try {
         
         //obtenemos el token
         const token = localStorage.getItem('token');

         // se valida que exista un token         
         if(!token) return

         // objeto de configuracion de los header 
         const config = {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
            }
         }

         // hacemos el request para guardar el proyecto
         const { data } = await clienteAxios.post('/proyectos', proyecto, config)         
         // console.log("PROYECTOS:",proyectos)
         // console.log("DATA",data)

         // actualizamos los proyectos  con el que se acaba de dar de alta(data)         
         setProyectos([...proyectos, data])

         setAlerta({
            msg: 'Proyecto Creado Correctamente',
            error: false,
         })

         setTimeout(() => {
            setAlerta({})
            navigate('/proyectos')
         }, 3000);

      } catch (error) {
         console.log(error)
      }
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