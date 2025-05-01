// src/pages/HomePage.jsx

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import AUTH_ROUTES from '../modules/auth/routes/paths';
import Logout from '../modules/auth/components/Logout';
import LoginPage from '../modules/auth/pages/LoginPage';
import { useAuth } from '../modules/auth/context/AuthContext';
import USER_ROUTES from '../modules/user/routes/path';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const HomePage = () => {

  const { isAuthenticated } = useAuth();
  // const { t }= useTranslation();
  const { t }= useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center p-6 shadow-md bg-white">
        <h1 className="text-2xl font-bold text-blue-600">NeoBank</h1> 
        <nav className="space-x-4">

          {isAuthenticated ? (
            <>
            <Link to={USER_ROUTES.UPDATE_PASSWORD} className="text-gray-700 hover:text-blue-600">update</Link>
              <Link to={USER_ROUTES.ME} className="text-gray-700 hover:text-blue-600">Me</Link>
              <Logout />
            </>
          ) : (
            <>
              <Link to={USER_ROUTES.FORGOT_PASSWORD} className="text-gray-700 hover:text-blue-600">forgot password</Link>
              {/* <LoginPage /> */}
              <NavLink to={AUTH_ROUTES.LOGIN} className="text-gray-700 hover:text-blue-600">{t('auth:sign_in')}</NavLink>
              <NavLink to={AUTH_ROUTES.REGISTER} className="text-gray-700 hover:text-blue-600">{t('auth:sign_up')}</NavLink>
              
            </>
          )
        }
        <LanguageSwitcher />
        </nav>
      </header>

      {/* Main */}
      <main className="flex flex-col items-center text-center py-20 px-4">

              <h1>{t('common:greeting')}</h1> 
              <p>{t('common:welcome')}</p>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Tu banco 100% digital
        </h2>
        <p className="text-lg md:text-xl max-w-2xl text-gray-600 mb-8">
          Gestiona tus cuentas, tarjetas y transferencias sin salir de casa. Seguridad, control y soporte desde cualquier lugar.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
            Ingresar como Cliente →
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 border-t">
        &copy; 2025 NeoBank. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default HomePage;
