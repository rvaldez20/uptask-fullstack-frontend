
export const formatearFecha = fecha => {
   console.log()
   // const fecha1 = "2023-09-10"   
   // const fecha2 = "09-10-2023"

   // para que tome la fecha correcta exacta
   const nuevaFecha = new Date(fecha.split('T')[0].split('-'))
   const opciones = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
   }

   return nuevaFecha.toLocaleDateString('es-Es', opciones)
}