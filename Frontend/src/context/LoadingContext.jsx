import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const showLoading = () => setIsLoading(true);
    const hideLoading = () => setIsLoading(false);

    const value = {
        isLoading,
        showLoading,
        hideLoading,
    }

    return(
        <LoadingContext.Provider value={ value } >
            { children }
        </LoadingContext.Provider>
    );
}

export const useLoading = () => {
    const context = useContext(LoadingContext);

    if(!context) throw new Error("useLoading debe estar dentro del proveedor LoadingProvider");

    return context;
}