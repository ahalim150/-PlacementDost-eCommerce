import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function AuthProtectedRoute({children}) {

    const { isLogIn } = useContext(AuthContext)

  return (
    <>
        {isLogIn ? <Navigate to={'/'}/> : children}
    </>
  )
}
