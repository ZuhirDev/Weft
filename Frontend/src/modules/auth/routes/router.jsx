import React, { useEffect } from 'react';
import { createBrowserRouter, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import AUTH_ROUTES from '@auth/routes/paths';
import LoginPage from '@auth/pages/LoginPage';
import Logout from '@auth/components/Logout';
import NotFoundPage from '../../errors/pages/NotFoundPage';
import RegisterPage from '@auth/pages/RegisterPage';
import Verify2FA from '@auth/components/2FA/Verify2FA';
import HomePage from '@/future/HomePage';
import { useAuth } from '@auth/context/AuthContext';

import USER_ROUTES from "@user/routes/path";
import MePage from '@user/pages/MePage';
import UpdatePassword from '@user/components/passwords/UpdatePassword';
import ForgotPassword from '@user/components/passwords/ForgotPassword';
import PasswordReset from '@user/components/passwords/PasswordReset';
import SendVerifyEmail from '@user/components/mails/SendVerifyEmail';
import VerifyEmail from '@user/components/mails/VerifyEmail';


const ProtectedRoutes = ({ children }) => {

  const { isAuthenticated, loading, needs2FA } = useAuth();

  if (loading) return <div className="p-4">Verificando sesión...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return(
    <>
      <Outlet /> 
      {needs2FA && <Verify2FA />}
    </>
  );
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: AUTH_ROUTES.REGISTER,
        element: <RegisterPage />,
      },

      {
        path: AUTH_ROUTES.LOGIN,
        element: <LoginPage />,
      },

      {
        element: <ProtectedRoutes />, 
        children: [
          // { path: AUTH_ROUTES.LOGOUT, element: <Logout /> },
          { path: USER_ROUTES.ME, element: <MePage /> },
          { path: USER_ROUTES.UPDATE_PASSWORD, element: <UpdatePassword /> },
    
          
      
          {
              path: USER_ROUTES.SEND_VERIFY_EMAIL,
              element: <SendVerifyEmail />,
          },
      
          {
              path: USER_ROUTES.VERIFY_EMAIL,
              element: <VerifyEmail />,
          },

        ]
      },

      {
        path: USER_ROUTES.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },

      {
        path: USER_ROUTES.PASSWORD_RESET,
        element: <PasswordReset />,
      },

    ]
  }
]);

export default router;
