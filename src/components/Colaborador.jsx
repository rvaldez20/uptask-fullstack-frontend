
const Colaborador = ({colaborador}) => {
   const {nombre, email} = colaborador;

   return (
      <div className="border-b p-5 flex justify-between items-center">
         <div>
            <p className="mb-1 text-xl">{nombre}</p>
            <p className="mb-1 text-sm text-gray-700">{email}</p>
         </div>

         <div>
            <button
               className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"               
            >Eliminar</button>
         </div>

      </div>
   )
}

export default Colaborador