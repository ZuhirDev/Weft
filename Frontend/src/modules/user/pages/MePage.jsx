import React, { useState, useEffect } from 'react';
import { useUser } from '@user/context/UserContext';
import { useAuth } from '@auth/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Enable2FA from '@auth/components/2FA/Enable2FA';
import Disable2FA from '@auth/components/2FA/Disable2FA';
import AUTH_ROUTES from '@auth/routes/paths';
import SendVerifyEmail from '@user/components/mails/SendVerifyEmail';
import PasswordVerification from '@/modules/auth/components/PasswordVerification';


/** SE ESTAN HACIENDO SOLICUTUDES CUANDO SE RECARGA, MAL INTENTAR RECUPERAR Y YA LUEGO SOLICITAR */

const MePage = () => {
  const { me } = useUser();
  const { isAuthenticated, user } = useAuth(); // Asumimos que tienes un estado de autenticación en tu contexto
  const [userData, setUserData] = useState(user);
  const navigate = useNavigate(); // Hook de navegación
  const [loading, setLoading] = useState(true); // Para controlar el estado de carga

  useEffect(() => {
    if (user) {
        // Si ya tenemos los datos del usuario, no hacemos la solicitud
        setUserData(user);
        setLoading(false);
    } else {
        // Si no tenemos los datos, hacemos la solicitud
        const fetchUserData = async () => {
            try {
                const response = await me();
                setUserData(response.user);
            } catch (error) {
                console.error("Error", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }
}, [me, user]);

if (loading) {
  return <div>Cargando...</div>;
}

  return (
    <div className="container mx-auto p-6">
      <Link to={AUTH_ROUTES.HOME}>Volver al inicio</Link>
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">About Me</h1>

      {userData && (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">User Profile</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-600">Name:</span>
              <span className="text-lg text-gray-800">{userData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-600">Email:</span>
              <span className="text-lg text-gray-800">{userData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-600">Email Verified:</span>
              <span className="text-lg text-gray-800">{userData.email_verified_at ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-600">2FA Enabled:</span>
              <span className="text-lg text-gray-800">{userData.google2fa_enabled ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-600">Account Created:</span>
              <span className="text-lg text-gray-800">{new Date(userData.created_at).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-medium text-gray-600">Last Updated:</span>
              <span className="text-lg text-gray-800">{new Date(userData.updated_at).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      <Enable2FA />
      <Disable2FA />
      <SendVerifyEmail />
      <PasswordVerification text={"Submit"} />
    </div>
  );
};

export default MePage;
