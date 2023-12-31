import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'

import io from 'socket.io-client'
let socket;

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {
   // states
   const [proyectos, setProyectos] = useState([])
   const [alerta, setAlerta] = useState({})
   const [proyecto, setProyecto] = useState({})
   const [cargando, setCargando] = useState(false)
   const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
   const [tarea, setTarea] = useState({})
   const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
   const [colaborador, setColaborador] = useState({})
   const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
   const [buscador, setBuscador] = useState(false)


   const navigate = useNavigate();
   const { auth } = useAuth();

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
   }, [auth])

   // useEffect para conexion con socket.io
   useEffect(() => {
      // conexion de socket.io con el backend
      socket = io(import.meta.env.VITE_BACKEND_URL)      
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
         // colocamos el proyecto en el state
         setProyecto(data)
         
         // quitamos la alerta del dome
         setAlerta({})      
      } catch (error) {
         navigate('/proyectos')

         setAlerta({
            msg: error.response.data.msg,
            error: true
         })

         setTimeout(() => {
            setAlerta({})
         }, 3000)
      } finally {
         setCargando(false)
      }   
   }

   // funcion para eliminar un proyecto
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
      setTarea({})
   }

   
   // funcion para agregar una nueva tarea a un proyecto
   const submitTarea = async (tarea) => {

      if(tarea?.id) {
         // si tenemos un id en la tarea quiere decir que vamos a editar la tarea
         await editarTarea(tarea)
      } else {
         // si no tenemos un id en l atarea quiere decir que vamos a crear la tarea
         await crearTarea(tarea)
      }      
   }

   // funcion para crear una tarea nueva
   const crearTarea = async tarea => {
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

         // hacemos el request para guardar l anueva tarea
         const { data } = await clienteAxios.post('/tareas', tarea, config)  
         // console.log(data)

         // actualizamos la tarea al state, la que se acaba de dar de alta(data) => 
         // la actualizacion del state la va manejar socket.io
         // const proyectoActualizado = { ...proyecto }
         // proyectoActualizado.tareas = [ ...proyecto.tareas, data]
         // setProyecto(proyectoActualizado)

         setAlerta({})                       // limpiamos alertas
         setModalFormularioTarea(false)      // cerrar el modal

         // SOCKET IO
         socket.emit('nueva tarea', data)

      } catch (error) {
         console.log(error.response)
      }
   }
   
   // funcion para editar una tarea
   const editarTarea = async tarea => {
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

         // hacemos el request para guardar l anueva tarea
         const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)  
         console.log(data)
         

         /* actualizamos la tarea actualizada en el state, la que se acaba de editar (data)
          la actualizacion del state la va manejar socket.io*/
         // const proyectoActualizado = { ...proyecto }
         // proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => tareaState._id === data._id ? data : tareaState )
         // setProyecto(proyectoActualizado)        

         setAlerta({})                       // limpiamos alertas
         setModalFormularioTarea(false)      // cerrar el modal

          // SOCKET IO
          socket.emit('actualizar tarea', data)

      } catch (error) {
         console.log(error.response)
      }
   }


   // fruncion para colocar la tarea en el state y mostrar el modal
   const handleModalEditarTarea = tarea => {
      setTarea(tarea)
      setModalFormularioTarea(true)
   }

   // funcion para pasar la tarea y mostrar el modal para cnfirmar eliminar la tarea
   const handleModalEliminarTarea = tarea => {      
      setTarea(tarea)
      setModalEliminarTarea(!modalEliminarTarea)
   }


   const eliminarTarea = async () => {
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

         // hacemos el request para guardar l anueva tarea
         const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`, config)  
         // console.log(data)
         setAlerta({
            msg: data.msg,
            error: false,
         })                       
         

         // actualizamos la tarea actualizada en el state, la que se acaba de editar (data)
         // la actualizacion del state la va manejar socket.io
         // const proyectoActualizado = { ...proyecto }
         // proyectoActualizado.tareas = proyectoActualizado.tareas.filter( tareaState => tareaState._id !== tarea._id )
         // setProyecto(proyectoActualizado)      

         setModalEliminarTarea(false)        // cerrar el modal        
         
      
         // SOCKET IO
         socket.emit('eliminar tarea', tarea)

         // despues de emitir a socket seteamos la tarea
         setTarea({})
         setTimeout(() => {
            setAlerta({})            
         }, 3000);

      } catch (error) {
         console.log(error)
      }
   }

   const submitColaborador = async email => {
      // habilitamnos el cargando
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

         // hacemos la peticion para enviar el email
         const { data } = await clienteAxios.post('/proyectos/colaboradores', { email }, config);
         
         // en caso de encontralo lo guardamos en el state
         setColaborador(data)
         setAlerta({})

      } catch (error) {
         setAlerta({
            msg: error.response.data.msg,
            error: true,
         })  
      } finally {
         setCargando(false)
      }
   }

   const agregarColaborador = async email => {
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

         // hacemos el request para agregar al colaborador al proyecto
         // hacemos la peticion para enviar el email
         const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email, config);
         // console.log(data.response)

         setAlerta({
            msg: data.msg,
            error: false,
         })  

         setColaborador({})

         setTimeout(() => {
            setAlerta({})
         }, 3000)

      } catch (error) {
         setAlerta({
            msg: error.response.data.msg,
            error: true,
         })  
      }
   }

   // funcion para pasar el colaborador y mostrar el modal para cnfirmar eliminar el colaborador
   const handleModalEliminarColaborador = (colaborador) => {
      setModalEliminarColaborador(!modalEliminarColaborador)

      setColaborador(colaborador)
      // console.log(colaborador)
   }

   const eliminarColaborador = async() => {
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
         
         // hacemos la peticion para enviar el id 
         const { data } = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, {id: colaborador._id}, config);

         // actualizamos el state y el dom
         const proyectoActualizado = { ...proyecto }
         proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)
         setProyecto(proyectoActualizado)

         setAlerta({
            msg: data.msg,
            error: false
         })
         setColaborador({})
         setModalEliminarColaborador(false)

         setTimeout(() => {
            setAlerta({})
         }, 3000)

      } catch (error) {
         console.log(error.response)
      }
   }

   const completarTarea = async id => {
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

         const { data } = await clienteAxios.post(`/tareas/estado/${id}`, {}, config)

         // actualizamos el state con la tarea catualizada
          // la actualizacion del state la va manejar socket.io
         // const proyectoActualizado = { ...proyecto }
         // proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => tareaState._id === data._id ? data : tareaState)
         // setProyecto(proyectoActualizado)

         setTarea({})
         setAlerta({})

         // SOCKET.IO
         socket.emit('cambiar estado', data)
         
      } catch (error) {
         console.log(error.response)
      }
   }

   // handle para buscar un proyecto
   const handleBuscador = () => {
      setBuscador(!buscador)
   }

   //SOCKET IO
   const submitTareasProyecto = tarea => {
      const proyectoActualizado = { ...proyecto }
      proyectoActualizado.tareas = [ ...proyectoActualizado.tareas, tarea]
      setProyecto(proyectoActualizado)
   }

   const eliminarTareaProyecto = tarea => {      
      const proyectoActualizado = { ...proyecto }
      proyectoActualizado.tareas = proyectoActualizado.tareas.filter( tareaState => tareaState._id !== tarea._id )
      setProyecto(proyectoActualizado)   
   }

   const actualizarTareaProyecto = tarea => {
      const proyectoActualizado = { ...proyecto }
      proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => tareaState._id === tarea._id ? tarea : tareaState )
      setProyecto(proyectoActualizado)   
   }

   const cambiarEstadoTarea = tarea => {
      const proyectoActualizado = { ...proyecto }
      proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => tareaState._id === tarea._id ? tarea : tareaState )
      setProyecto(proyectoActualizado)    
   }

   // close session
   const cerrarSesionProyectos = () => {
      setProyectos([])
      setProyecto({})
      setAlerta({})
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
            submitTarea,
            handleModalEditarTarea,
            tarea,
            modalEliminarTarea,
            handleModalEliminarTarea,
            eliminarTarea,
            submitColaborador,
            colaborador,
            agregarColaborador,
            modalEliminarColaborador,
            handleModalEliminarColaborador,
            eliminarColaborador,
            completarTarea,
            handleBuscador,
            buscador,
            submitTareasProyecto,
            eliminarTareaProyecto,
            actualizarTareaProyecto,
            cambiarEstadoTarea,
            cerrarSesionProyectos,
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