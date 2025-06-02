import { createContext, useContext } from "react";
import { depositService, externalTransferService, transferService, withdraeService } from "../services/transactionService";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {

    const deposit =async (data) => {
        try {
            const response = await depositService(data);
        } catch (error) {
            throw error;
        }
    }

    const withdraw =async (data) => {
        try {
            const response = await withdraeService(data);
        } catch (error) {
            throw error;
        }
    }

    const transfer =async (data) => {
        try {
            const response = await transferService(data);
        } catch (error) {
            throw error;
        }
    }

    const external =async (data) => {
        console.log("datacontext", data)
        try {
            const response = await externalTransferService(data);
        } catch (error) {
            throw error;
        }
    }

    const value  = {
        deposit,
        withdraw,
        transfer,
        external,
    }

    return(
        <TransactionContext.Provider value={ value } >
            { children }
        </TransactionContext.Provider>
    );
}

export const useTransaction  = () => {
    const context = useContext(TransactionContext);

    if(!context) throw new Error("useTransactions debe estar dentro del proveedor TransactionProvider");

    return context;
}