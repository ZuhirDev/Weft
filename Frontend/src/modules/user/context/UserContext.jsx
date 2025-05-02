import { createContext, useContext } from "react";
import { forgotPasswordService, meService, passwordResetService, sendVerifyEmailService, updatePasswordService, verifyEmailService } from "@user/service/userService";


const userContext = createContext();

export const UserProvider = ({ children }) => {

    
    const me = async () => { 
        return  await meService();
    }

    const updatePassword = async (passwords) => {
        const response  = await updatePasswordService(passwords);
    }

    const forgotPassword = async (data) => {
        const response = await forgotPasswordService(data);

    }

    const passwordReset = async (data) => {
        const response = await passwordResetService(data);
        console.log("response contex", response)

        return response;
    }


    const sendVerifyEmail = async () => {
        const response = await sendVerifyEmailService();
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