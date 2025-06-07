import { createContext, useContext, useEffect, useState } from "react";
import { disable2FAService, enable2FAService, loginService, logoutService, passwordVerificationService, registerService, verify2FAService } from "@auth/services/authService";
import { meService, updateCustomerService } from "@/modules/user/service/userService";
import socketService from "@/lib/socketService";

const AuthContext = createContext();
 
export const AuthProvider = ({ children }) => { 

    const [user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [needs2FA, setNeeds2FA] = useState(false);

    const isAuthenticated = !!user;

    const updateCustomer = async (data) => {
        try {
            const response = await updateCustomerService(data);
            await refreshUser();

            return response;
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        const needs2FAStored  = sessionStorage.getItem('needs_2fa') === 'true';

        if(sessionStorage.getItem('token') && storedUser){
            setUser(JSON.parse(storedUser));
            socketService.init(sessionStorage.getItem('token'));
        } 

        setLoading(false);
        setNeeds2FA(needs2FAStored);
    }, []);

    useEffect(() => {

        if(isAuthenticated && needs2FA === false) {
            const fetchData = async () => {
                const response = await meService();
                setUser(response.user);
                sessionStorage.setItem('user', JSON.stringify(response.user));
            } 

            fetchData();
        }
    }, [isAuthenticated, needs2FA]);


    const registerUser = async (data) => {
        const response = await registerService(data);

        return response;
    }

    const login = async (data) => {
        try {
            const response = await loginService(data);
            if(response.status === 403 && response.token){
                setNeeds2FA(true);
                sessionStorage.setItem('needs_2fa', 'true');
            }

            sessionStorage.setItem('user', JSON.stringify(response.user));
            sessionStorage.setItem('token', response.token);
            setUser(response.user);
            socketService.init(response.token);

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
            sessionStorage.removeItem('needs_2fa');
            setUser(null);
            socketService.disconnect();
        }
    }


    const enable2FA = async () => {
        try {
            const response = await enable2FAService();

            return response;
        } catch (error) {
            throw error;
        }
    }

    const verify2FA = async (otp) => {
        const response = await verify2FAService(otp);

        sessionStorage.setItem('needs_2fa', 'false');
        sessionStorage.setItem('user', JSON.stringify(response.user));
        sessionStorage.setItem('token', response.token);
        socketService.init(response.token);
        setNeeds2FA(false);
        setUser(response.user);

        return response
    }

    const disable2FA = async () => {
        try {
            const response = await disable2FAService();
            await refreshUser();
            sessionStorage.removeItem('needs_2fa');
            setNeeds2FA(false);
            return response; 
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

    const refreshUser = async () => {
        try {
            const response = await meService();
            const updatedUser = response.user;

            setUser(updatedUser);
            sessionStorage.setItem('user', JSON.stringify(updatedUser));

            return updatedUser;
        } catch (error) {
            throw error;
        }
    };


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
        setUser,
        updateCustomer
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