import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import Login from '../../Components/Login/Login'

export default function ProtectedRoute({children}) {

    const { isLogIn } = useContext(AuthContext);
    
  return (
    <>
        {isLogIn ? children : <Login/>}
    </>
  )
}
