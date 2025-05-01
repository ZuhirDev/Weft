import { createContext, useContext, useEffect, useState } from "react";
import { disable2FAService, enable2FAService, loginService, logoutService, registerService, verify2FAService } from "@auth/services/authService";

const AuthContext = createContext();
 
export const AuthProvider = ({ children }) => { 

    /** BUSCAR INFORMACION SOBRE HTTPS ONLY PARA MEJORAR LA SEGURIDAD */

    const [user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true); // se usa loading para cuando cargar no rediridir rapidamente
    const [needs2FA, setNeeds2FA] = useState(false);

    const isAuthenticated = !!user;

    // el problama es que need2fa cuando se recarga la pagina se vuelve en false, 
    // y eso no puede ser quiero que si el user hace login y need2fa se pone en true que no cambie aunque recargue la pagina 
    // y el usuario haga lo que quiera

    /**
     * REVISAR NUEVOS CAMBIOS DE EMPLOYEE Y CUSTOMS ETC
     * para deshabilitar 2fa hay que poner la password por seguridad
     */

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
            // return response.data  
            console.log("response login", response)

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
        const response = await logoutService();

        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('2fa_enabled');
        setUser(null);

        return response;        
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
        console.log("response disable", response)
        sessionStorage.removeItem('2fa_enabled');
        setNeeds2FA(false);
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
        throw new Error("useAuth debe estar dentro del proveedor AuthProvider"); // MODIFICAR MENSAJES
    } 
 
    return context;       
}     