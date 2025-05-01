import React from 'react';
import { useAuth } from '@auth/context/AuthContext';
import { useTranslation } from 'react-i18next';

const Disable2FA = () => {

  const { t } = useTranslation();
  const { disable2FA } = useAuth();

  const handleDisable2FA = async () => {
    const response = await disable2FA();

    console.log("response en disablpage", response)
  }
  return (
    <>
       <button
        onClick={handleDisable2FA} 
        className="bg-red-500 text-white ml-8 px-4 py-2 rounded hover:bg-red-600 transition duration-300"
      >
        {t('auth:disable_2fa')}
      </button>
    </>
  )
}

export default Disable2FA;
