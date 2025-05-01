import React from 'react';
import { useUser } from '../../context/UserContext';

const ForgotPassword = () => {

  const { forgotPassword } = useUser(); 

  const email = "admin@admin.es";
  

  const handleForgotPassword = async () => {

    const response = await forgotPassword(email);
    console.log("response forgot", response)
  }


  return (
    <div>
      <h1>ForgotPassword</h1>

      <button 
        onClick={handleForgotPassword}
        type="button" 
        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        He olvidado mi contraseña
      </button>
    </div>
  )
}

export default ForgotPassword;
