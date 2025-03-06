import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router-dom'



export default function MainLayout() {
  return (
    <div>
      <Navbar/>
      <div className='container py-20'>
      <Outlet/>
      </div>
      
      <Footer/>
     


     
    </div>
  )
}
