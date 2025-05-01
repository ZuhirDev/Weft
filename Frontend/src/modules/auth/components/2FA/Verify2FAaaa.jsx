import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Verify2FA = () => {

  /** cuando otp empieza por 0 no lo envia , solo los otros 5 */
  const [OTP, setOTP] = useState(undefined);
  const { verify2FA } = useAuth();
  const [modalVisible, setModalVisible] = useState(true); // El modal será visible al principio
  const [loading, setLoading] = useState(false);

  const handleVerify2FA = async () => {

    try {
      console.log("OPT", OTP)
      // const response = await verify2FA(Number(OTP));
      // console.log("respnse verify2fa", response)

      // setModalVisible(false);
      setModalVisible(true);

    } catch (error) {
      console.log("Error", error);
    }
        setLoading(false);
  }
  

  return (

    <div className="relative">
  {/* Fondo del modal (semi-transparente usando rgba) */}
  <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-50"></div>

  {/* Modal de verificación OTP */}
  <div className="fixed inset-0 flex justify-center items-center z-60">
    <div className="bg-white p-6 w-96 shadow-2xl rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Verificar 2FA</h2>
      <p className="text-gray-700 mb-4">Introduce el código de 6 dígitos generado por tu aplicación de autenticación.</p>

      {/* Input de OTP */}
      <input
        type="text"
        value={OTP}
        onChange={(e) => setOTP(e.target.value)}
        className="mt-4 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Código de 6 dígitos"
        maxLength={6}
        disabled={loading}  // Deshabilitar input mientras se verifica
      />

      {/* Botón de verificación */}
      <button
        onClick={handleVerify2FA}
        className={`mt-4 p-3 w-full rounded-lg ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        disabled={loading}  // Deshabilitar botón mientras se verifica
      >
        {loading ? 'Verificando...' : 'Verificar'}
      </button>
    </div>
  </div>
</div>

  )
}

export default Verify2FA;
