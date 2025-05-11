import { createContext, useContext, useEffect, useState } from "react";
import { getAllAccountsService, updateAccountService } from "../services/accountService";
import { useLoading } from "@/context/LoadingContext";
import { useAuth } from "@/modules/auth/context/AuthContext";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {

    const { isAuthenticated } = useAuth();
    const [accounts, setAccounts] = useState([]);
    const [isBlocked, setIsBlocked] = useState(false);

    console.log("isauthbbbb", isAuthenticated)

    const getAllAccounts = async () => {
        try {
            const response = await getAllAccountsService();
            setAccounts(response.accounts);
            console.log("response account", response.accounts);
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        getAllAccounts();
    }, []);


    const updateAccount = async (data) => {
        try {
            const response = await updateAccountService(data);
        } catch (error) {
            throw error;
        }
    }




    const value = {
        accounts,
        updateAccount,
    }

    return(
        <AccountContext.Provider value={ value } >
            { children }
        </AccountContext.Provider>
    );

}

export const useAccount = () => {
    const context = useContext(AccountContext);

    if(!context) throw new Error("useAccount debe estar dentro del proveedor AccountProvider");

    return context;
}