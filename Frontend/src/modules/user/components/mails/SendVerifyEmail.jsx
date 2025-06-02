import React from 'react';
import { useUser } from '@user/context/UserContext';
import { useTranslation } from 'react-i18next';

const SendVerifyEmail = () => {
  /** mostrar errores del backend  */

  const { t } = useTranslation();
  const { sendVerifyEmail } = useUser();

  const handleSendVerifyEmail = async () => {
    const response = await sendVerifyEmail();
  }

  return (
    <div>
      <button 
      onClick={handleSendVerifyEmail}
      type="button" 
      className="text-gray-900 bg-gradient-to-r mt-10 from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        {t('auth:send_verification_email')}
      </button>
    </div>
  )
}

export default SendVerifyEmail;
