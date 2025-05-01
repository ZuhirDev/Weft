import React from 'react';
import { useUser } from '../../context/UserContext';

const UpdatePasswordddd = () => {

  const { updatePassword } = useUser();

  const passwords =  {
    current_password: "11111111",
    password: "55555555",
    password_confirmation: "55555555"
    }

  const handleUpdatePassword = () => {
    const response = updatePassword(passwords);

    console.log("response en update", response)
  }

  return (
    <div>
      <h1>UpdatePassword</h1>


      <button 
        onClick={handleUpdatePassword}
        type="button" 
        className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Pulsa para cambiar la contra
      </button>

    </div>
  )
}

export default UpdatePasswordddd;
