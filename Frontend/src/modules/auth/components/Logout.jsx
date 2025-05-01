import React from 'react';
import { useAuth } from '@auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AUTH_ROUTES from '@auth/routes/paths';
import { useTranslation } from 'react-i18next';

const Logout = () => {

  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();
      console.log("logoutpage", response);
      navigate(AUTH_ROUTES.HOME);
    } catch (error) {
      console.log("Error", error);
    }
  }


  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
    >
      {t('auth:logout')}
    </button>
  )
}

export default Logout;
