import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '@/components/Footer'
import Navbar from '@/components/navbar/Navbar'

const ProtectedLayout = () => {

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">

      <Navbar />
      <main className="flex-1 w-[90vw] mx-auto py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default ProtectedLayout
