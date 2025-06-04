import { createContext, useContext, useEffect, useState } from "react";
import { createCustomerService, forgotPasswordService, getCustomerService, meService, passwordResetService, sendVerifyEmailService, updateCustomerService, updatePasswordService, verifyEmailService } from "@user/service/userService";
import useModal from "@/hooks/useModal";
import Loading from "@/components/Loading";
import useAuthEffect from "@/hooks/useAuthEffect";
import { useAuth } from "@/modules/auth/context/AuthContext";


const userContext = createContext();

export const UserProvider = ({ children }) => {

    const { isOpen, open, close } = useModal();

    const { setUser } = useAuth();

    const me = async () => { 
        const response =  await meService();


        return response;
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

            setUser(response.user);
            sessionStorage.setItem(JSON.stringify(response?.user))

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

    const value = {
        me,
        updatePassword,
        forgotPassword,
        passwordReset,
        sendVerifyEmail,
        verifyEmail,
        updateCustomer,
        getCustomer,
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