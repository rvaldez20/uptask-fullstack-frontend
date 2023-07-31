import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {
   // states
   const [proyectos, setProyectos] = useState([])
   const [alerta, setAlerta] = useState({})
   const [proyecto, setProyecto] = useState({})
   const [cargando, setCargando] = useState(false)
   const [modalFormularioTarea, setModalFormularioTarea] = useState(false)


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

   // hace submit y grada un nuevo proyecto
   const submitProyecto = async (proyecto) => {
      if(proyecto.id) {
         await editarProyecto(proyecto)
      } else {
         await nuevoProyecto(proyecto)
      }      
   }

   // funcion para submit que edita un proyecto
   const editarProyecto = async (proyecto) => {
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
         const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)
         console.log(data)
         
         // sincronizar el state (actualizamos unicamente el registro que cambio)
         const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
         setProyectos(proyectosActualizados)
         // console.log(proyectosActualizados)


         setAlerta({
            msg: 'Proyecto Actualizado Correctamente',
            error: false,
         })

         setTimeout(() => {
            setAlerta({})
            navigate('/proyectos')
         }, 2000);

      } catch (error) {
         console.log(error)
      }
   }

   // funcion para submit d eun nuevo proyecto
   const nuevoProyecto = async (proyecto) => {
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


   // funcion para obtenerProyecto por ID
   const obtenerProyecto = async (id) => {

      // cargando lo ponemos en true cuandos e va obtener el proyecto
      setCargando(true)
      
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
         const { data } = await clienteAxios.get(`/proyectos/${id}`, config);
         // console.log(data)

         // colocamos el proyecto en el state
         setProyecto(data)
         
      } catch (error) {
         console.log(error)
      } finally {
         setCargando(false)
      }   
   }

   const eliminarProyecto = async (id) => {
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
         const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)
         console.log(data)

         // sincronizar el state (
         const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
         setProyectos(proyectosActualizados)
         //console.log(proyectosActualizados)
         
         

         setAlerta({
            msg: data.msg,
            error: false,
         })
         
         setTimeout(() => {
            setAlerta({})
            navigate('/proyectos')
         }, 2000);
         
      } catch (error) {        
         console.log(error.response)
      }
   }

   // funcion para mostrar u ocultar el modal formulario tareas
   const handleModalTarea = () => {
      setModalFormularioTarea(!modalFormularioTarea);
   }

   
   const submitTarea = async (tarea) => {
      console.log(tarea)
   }


   return(
      <ProyectosContext.Provider
         value={{
            proyectos,
            mostrarAlerta,
            alerta,
            submitProyecto,
            obtenerProyecto,
            proyecto,
            cargando,
            eliminarProyecto,
            modalFormularioTarea,
            handleModalTarea,
            submitTarea
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