import { createContext, useContext, useEffect, useState } from "react";
import { createAccountService, deleteAccountService, getAllAccountsService, updateAccountService } from "../services/accountService";
import { useAuth } from "@/modules/auth/context/AuthContext";
import useModal from "@/hooks/useModal";
import Loading from "@/components/Loading";
import socketService from "@/lib/socketService";
import { toast } from "sonner";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {

    const { isAuthenticated } = useAuth();
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const { isOpen, open, close } = useModal();


    useEffect(() => {

        if (!accounts?.length) return;

        const subscribedChannels = accounts.map((account) => {
            const channel = socketService.subscribeToPrivate(`account.${account.id}`)
            
            channel.listen('.transaction-completed', (e) => {
                console.log("eventaso", e.message)
                toast.success(e.message)
                transactionEvent(e);
            });

            return `account.${account.id}`;
        });

        return () => {
            subscribedChannels.forEach((channelName) => {
                socketService.unsubscribe(channelName);
            });
        };

    }, [accounts]);

    const transactionEvent = (e) => {

        setAccounts((prevAccounts) => {
            const updatedAccounts = prevAccounts.map((acc) => acc.id === e.account_id
                                        ? { ...acc, balance: parseFloat(e.balance), transactions: [e.transaction, ...acc.transactions].slice(0, 5) }
                                        : acc
                                    );

            setSelectedAccount((prev) => {
                const updatedSelected = updatedAccounts.find(acc => acc.id === prev.id);
                return updatedSelected;
            })
            
            return updatedAccounts ;
        });
    };


    const getAllAccounts = async () => {
        open();
        try {
            const response = await getAllAccountsService();
            setAccounts(response.accounts);
            return response.accounts;
        } catch (error) {
            throw error;
        }finally{
            close();
        }
    }
    
    const changeSelectedAccount = (account)  => setSelectedAccount(account);
    

    useEffect(() => {
        requestIdleCallback(() => isAuthenticated && getAllAccounts())
    }, [isAuthenticated]);

    
    const createAccount = async (data) => {
        try {
            const response = await createAccountService(data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    const updateAccount = async (data) => {
        try {
            const response = await updateAccountService(data);

            return response;
        } catch (error) {
            throw error;
        }
    }

    const deleteAccount = async (data) => {
        try {
            const response = await deleteAccountService(data);

            return response;
        } catch (error) {
            throw error;
        }
    }

    const refreshAccounts = async (selectedAccountId) => {
        try {
            const response = await getAllAccountsService();
            setAccounts(response.accounts);

            if (selectedAccountId) {
            const updatedSelected = response.accounts.find(acc => acc.id === selectedAccountId);
                setSelectedAccount(updatedSelected || null);
            }

            return response.accounts;
        } catch (error) {
            throw error;
        } 
    }

    if(isOpen) return <Loading isOpen={isOpen} />

    const value = {
        accounts,
        selectedAccount,
        updateAccount,
        changeSelectedAccount,
        createAccount,
        getAllAccounts,
        refreshAccounts,
        deleteAccount,
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