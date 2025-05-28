import { createContext, useContext, useState } from "react";

const VisibilityContext = createContext();

export const VisibilityProvider = ({ children }) => {

  const [isBlurred, setIsBlurred] = useState(false);

  const toggleBlur = () => setIsBlurred(prev => !prev);

  const value = {
    isBlurred,
    toggleBlur,
  }

  return(
    <VisibilityContext.Provider value={ value } >
        { children }
    </VisibilityContext.Provider>
  );
}

export const useVisibility = () => {

    const context = useContext(VisibilityContext)

    if(!context){
        throw new Error("useVisibility debe estar dentro del proveedor VisibilityProvider");
    }

    return context;
}