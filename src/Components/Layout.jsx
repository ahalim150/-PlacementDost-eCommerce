import React from 'react'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
        <Navbar/>
          <div className="container mx-auto p-5 my-5 w-3/4">
            <Outlet />
          </div>
        <Footer/>
    </>
  )
}
