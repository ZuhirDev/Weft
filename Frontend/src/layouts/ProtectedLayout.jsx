import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from '@/components/Footer'
import { useAuth } from '@/modules/auth/context/AuthContext'
import { UserProvider } from '@/modules/user/context/UserContext'
import { VisibilityProvider } from '@/context/VisibilityContext'
import { TransactionProvider } from '@/modules/transaction/context/TransactionContext'
import { CardProvider } from '@/modules/card/context/CardContext'
import { AccountProvider } from '@/modules/account/context/AccountContext'

const ProtectedLayout = () => { 

  const { isAuthenticated } = useAuth();

  return (

                <UserProvider >
              <VisibilityProvider >
                <TransactionProvider>
                  <CardProvider>
                    <AccountProvider >
                     

    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>


                    </AccountProvider>
                  </CardProvider>
                </TransactionProvider>
              </VisibilityProvider>
            </UserProvider>

    

  )
}

export default ProtectedLayout
