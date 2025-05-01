import React, { useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const PasswordReset = () => {

  const { passwordReset } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const data = {
    token: params.get('token'),
    email: params.get('email'),
    password: '111111113',
    password_confirmation: '111111113',
  }

  console.log(data)


  const handleResetPassword = async () => {
    const response = await passwordReset(data);

    if(response) navigate('/login')
  }


  return (
    <div>
      <h1>PasswordReset</h1>
      {/* <input type="text" name="email" value={data.email} /> */}

      <button 
      onClick={handleResetPassword}
      type="button" 
      className="text-gray-900 bg-gradient-to-r mt-10 from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Reset Password
      </button>
    </div>
  )
}

export default PasswordReset;
