import React, { useState } from 'react';
import { useAuth } from '@auth/context/AuthContext';
import { useTranslation } from 'react-i18next';
import PasswordVerification from '../PasswordVerification';
import useModal from '@/hooks/useModal';

/** AÑDIR UN SKELETON O LOADING MIENTRAS SE VERIFICA  y mostrar mensajes de error*/
const Disable2FA = () => {

  const { t } = useTranslation();
  const { disable2FA } = useAuth();
  const { isOpen, open, close } = useModal();

  const handleDisable2FA = async () => {

    close();
    try {
      const response = await disable2FA();

    } catch (error) {
      console.log(error.response.data.message)
    }

    
  }
  return (
    <>
       <button
        onClick={open} 
        className="bg-red-500 text-white ml-8 px-4 py-2 rounded hover:bg-red-600 transition duration-300"
      >
        {t('auth:disable_2fa')}
      </button>

      <PasswordVerification 
        isOpen={isOpen}
        onClose={close}
        onVerify={handleDisable2FA}
      />
    </>
  )
}

export default Disable2FA;
