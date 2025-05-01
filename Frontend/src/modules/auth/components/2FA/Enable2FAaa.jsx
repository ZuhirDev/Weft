import React, { useState } from 'react';
import { useAuth } from '@auts/context/AuthContext';
import { QRCodeSVG } from 'qrcode.react';

const Enable2FA = () => {

  const { enable2FA, setNeeds2FA  } = useAuth();
  const [qrCodeURL, setQrCodeURL] = useState(null);
  const [secret, setSecret] = useState(null);
  
  const handleEnable2FA = async () => {

    try {
      const response = await enable2FA();
      console.log("response en enablepage", response);

      setQrCodeURL(response.qr_url);
      setSecret(response.secret)
    } catch (error) {
      console.log("Error", error);
    }
  }

  const handleClose = () => {
    setNeeds2FA(true);
    sessionStorage.setItem('2fa_enabled', true);
  }
  
  return (
    <>
      <button
        onClick={handleEnable2FA} 
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
      >
        Enable 2FA
      </button>

      

      { qrCodeURL && (
        <>
          
          <h2>Escanea este codigo QR</h2>
          <QRCodeSVG value={qrCodeURL} size={256} />

          <p>Your Secret: {secret}</p>

          <button 
            onClick={handleClose}
            class="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
            Cerrar
          </button>

        </>
        
      )} 

    </>
  )
}

export default Enable2FA;
