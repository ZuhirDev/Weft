import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '@/modules/auth/context/AuthContext';

const RootLayout = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      {isAuthenticated && <Navbar />}
      <Outlet />
    </div>
  )
}

export default RootLayout;
