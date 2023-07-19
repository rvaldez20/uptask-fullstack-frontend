import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
      <>
         <div>AuthLayout</div>

         <Outlet />      
      </>
  )
}

export default AuthLayout