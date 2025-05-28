import { createContext, useContext, useEffect, useState } from "react";
import { disable2FAService, enable2FAService, loginService, logoutService, passwordVerificationService, registerService, verify2FAService } from "@auth/services/authService";

const AuthContext = createContext();
 
export const AuthProvider = ({ children }) => { 

    const [user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [needs2FA, setNeeds2FA] = useState(false);

    const isAuthenticated = !!user;

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');

        if(sessionStorage.getItem('token') && storedUser){
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);

        if((sessionStorage.getItem('2fa_enabled')) === 'true'){
            setNeeds2FA(true);
        }

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
            }
            sessionStorage.setItem('user', JSON.stringify(response.user));
            sessionStorage.setItem('token', response.token);
            setUser(response.user);
            
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
            setUser(null);
        }

    }


    const enable2FA = async () => {
        const response = await enable2FAService();
        console.log("response de enable", response);

        return response;
    }

    const verify2FA = async (otp) => {
        console.log("otp contex", otp)
        const response = await verify2FAService(otp);
        console.log("verify2fa context", response);

        sessionStorage.setItem('2fa_enabled', false);
        sessionStorage.setItem('user', JSON.stringify(response.user));
        sessionStorage.setItem('token', response.token);
        setNeeds2FA(false);
        setUser(response.user);
    }

    const disable2FA = async () => {
        const response = await disable2FAService();
        sessionStorage.removeItem('2fa_enabled');
        setNeeds2FA(false);
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