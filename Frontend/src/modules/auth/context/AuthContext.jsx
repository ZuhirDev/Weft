import { createContext, useContext, useEffect, useState } from "react";
import { disable2FAService, enable2FAService, loginService, logoutService, passwordVerificationService, registerService, verify2FAService } from "@auth/services/authService";

const AuthContext = createContext();
 
export const AuthProvider = ({ children }) => { 

    const [user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [needs2FA, setNeeds2FA] = useState(false);
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);

    const isAuthenticated = !!user;

    /**
     * REVISAR LA CONFIG DEL USUARIO, PARA NO GUARDAR EN STORAGE 
     * Y SOLO EN ESTADOS Y CUANDO REFRESCA HACER FETCH
     */

    /**
     * CUANDO RECARGO LA PAGINA , SE PIERDE EL AUTH OTP
     * EN BACKEND CUANDO HAGLO LOGIN/LOGOUT SE ACTUALIZA EL ENABLED DE BD
     */


    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        const is2FAEnabledStored  = sessionStorage.getItem('2fa_enabled') === 'true';
        const is2FAVerifiedStored  = sessionStorage.getItem('2fa_verified') === 'true';

        if(sessionStorage.getItem('token') && storedUser) setUser(JSON.parse(storedUser));
        
        setLoading(false);

        setNeeds2FA(is2FAVerifiedStored);
        setIs2FAEnabled(is2FAEnabledStored);
    }, []);

    const registerUser = async (data) => {
        const response = await registerService(data);

        return response;
    }

    const login = async (data) => {
        try {
            const response = await loginService(data);
            if(response.status === 403 && response.token){
                setNeeds2FA(true);
                sessionStorage.setItem('2fa_enabled', true);
                sessionStorage.setItem('2fa_verified', false);
            }
            sessionStorage.setItem('user', JSON.stringify(response.user));
            sessionStorage.setItem('token', response.token);
            setUser(response.user);
            setEmailVerified(response.user?.email_verified_at);

            return response;
        } catch (error) {
            throw error;
        }
    }

    const logout = async () => {
        try {
            const response = await logoutService();
            return response;        
        } catch (error) {
            throw error;
        }finally{
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('2fa_enabled');
            sessionStorage.removeItem('2fa_verified');
            setUser(null);
        }

    }


    const enable2FA = async () => {
        try {
            const response = await enable2FAService();
            console.log("response de enable", response);
            sessionStorage.setItem('2fa_enabled', 'true');


            return response;

        } catch (error) {
            throw error;
        }
        
    }

    const verify2FA = async (otp) => {
        console.log("otp contex", otp)
        const response = await verify2FAService(otp);
        console.log("verify2fa context", response);

        sessionStorage.setItem('2fa_verified', 'false');
        sessionStorage.setItem('user', JSON.stringify(response.user));
        sessionStorage.setItem('token', response.token);
        setNeeds2FA(false);
        setIs2FAEnabled(true);
        setUser(response.user);

        return response
    }

    const disable2FA = async () => {
        try {
            const response = await disable2FAService();
            sessionStorage.removeItem('2fa_enabled');
            sessionStorage.removeItem('2fa_verified');
            setNeeds2FA(false);
            setIs2FAEnabled(false);            
        } catch (error) {
            throw error;
        }
    }

    const passwordVerification = async (data) => {
        try {
            const response = await passwordVerificationService(data);

            return response;
        } catch (error) {
            throw error;
        }
    }

    const value = {
        registerUser,
        login,
        logout,
        user, 
        isAuthenticated,
        enable2FA,
        verify2FA,
        needs2FA,
        setNeeds2FA,
        disable2FA,
        passwordVerification,
        loading,
        is2FAEnabled,
        emailVerified
    }

    return(
        <AuthContext.Provider value={ value } >
            {children}
        </AuthContext.Provider>
    ); 
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth debe estar dentro del proveedor AuthProvider");
    } 
 
    return context;       
}     