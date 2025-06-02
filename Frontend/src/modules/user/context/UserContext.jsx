import { createContext, useContext, useEffect, useState } from "react";
import { createCustomerService, forgotPasswordService, getCustomerService, meService, passwordResetService, sendVerifyEmailService, updateCustomerService, updatePasswordService, verifyEmailService } from "@user/service/userService";
import useModal from "@/hooks/useModal";
import Loading from "@/components/Loading";
import { useAuth } from "@/modules/auth/context/AuthContext";


const userContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const { isAuthenticated } = useAuth();
    const { isOpen, open, close } = useModal();

    useEffect(() => {

        if(isAuthenticated){

            
            open();
    
            const customer = async () => {
                const response = await getCustomer();
                setUser(response.customer);
            }
    
    
    
            customer();
    
            close();
        }
    }, [isAuthenticated]);
    
    
    const me = async () => { 
        return  await meService();
    }

    const createCustomer = async (data) => {
        try {
            const response = await createCustomerService(data);

            return response;
        } catch (error) {
            throw error;
        }
    }

    const updateCustomer = async (data) => {
        try {
            const response = await updateCustomerService(data);

            return response;
        } catch (error) {
            throw error;
        }
    }

    const getCustomer = async () => {
        try {
            const response = await getCustomerService();

            return response;
        } catch (error) {
            throw error;
        }
    }

    const updatePassword = async (passwords) => {
        const response  = await updatePasswordService(passwords);
        return response;
    }

    const forgotPassword = async (data) => {
        const response = await forgotPasswordService(data);
        return response;

    }

    const passwordReset = async (data) => {
        const response = await passwordResetService(data);
        console.log("response contex", response)

        return response;
    }


    const sendVerifyEmail = async () => {
        const response = await sendVerifyEmailService();
        return response;
    }

    const verifyEmail = async (url) => {
        const response = await verifyEmailService(url);
        return response;
    }

    if(isOpen) return <Loading />;

    const value = {
        me,
        updatePassword,
        forgotPassword,
        passwordReset,
        sendVerifyEmail,
        verifyEmail,
        updateCustomer,
        getCustomer,
        user,
        createCustomer
    }

    return(
        <userContext.Provider value={ value } >
            { children }
        </userContext.Provider>
    );
}

export const useUser = () =>  {

    const context = useContext(userContext);

    if(!context){
        throw new Error("useUser debe estar dentro del proveedor UserProvider");
    }
    
    return context;
}