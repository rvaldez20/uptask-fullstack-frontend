import { useState, useEffect, createContext } from 'react'

const AuthContext = createContext();

const AuthProvider  = ({children}) => {


   return (
      <AuthContext.Provider 
         value={{
            
         }}
      >
         {children}
      </AuthContext.Provider>
   )
}

export {
   AuthProvider
}

export default AuthContext;