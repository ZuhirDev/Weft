import { createContext, useContext, useState } from "react";
import { accountChartService, createAccountService, deleteAccountService, getAllAccountsService, updateAccountService } from "@account/services/accountService";
import useModal from "@/hooks/useModal";
import Loading from "@/components/Loading";
import socketService from "@/lib/socketService";
import { toast } from "sonner";
import useAuthEffect from "@/hooks/useAuthEffect";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {

    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const { isOpen, open, close } = useModal();

    useAuthEffect(() => {

        if (!accounts?.length) return;

        const subscribedChannels = accounts.map((account) => {
            const channel = socketService.subscribeToPrivate(`account.${account.id}`)
            
            channel.listen('.transaction-completed', (e) => {
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

    useAuthEffect(() => {
        const fetchData = async () => {
            try {
                await getAllAccounts();

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, []);
    
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
            setSelectedAccount(response.accounts[0]);
            return response.accounts;
        } catch (error) {
            throw error;
        }finally{
            close();
        }
    }
    
    const changeSelectedAccount = (account)  => setSelectedAccount(account);
    

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

    const accountChart = async (data) => {
        try {
            const response = await accountChartService(data);

            return response;
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
        accountChart,
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