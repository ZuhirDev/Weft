import React from 'react';
import { useAuth } from '../context/AuthContext';

const RegisterPageeee = () => {

    const { register } = useAuth();
  

    const data = {
      email: "felipe@felipe.es",
      status: 'active',
    //   type: 'customer',
      password: "11111111",
      password_confirmation: "11111111"
    }

    // User::create([
    //     'email'=> 'john@cena.es',
    //     'status'=> 'active',
    //     'google2fa_secret'=> null,
    //     'google2fa_enabled'=> false,
    //     'password'=> Hash::make('659735061'),
    //     'type'=> 'customer',
    // ]);


    const handleRegister = async () => {
        const response = await register(data);
        console.log("respnse page", response)
    }
  
  
    return (
    <div>

    <button 
      onClick={handleRegister}
      type="button" 
      className="text-gray-900 bg-gradient-to-r mt-10 from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Register
    </button>
      
    </div>
  )
}

export default RegisterPageeee;
