import { createContext, useContext, useEffect, useState } from "react";
import { cardTypesService, createCardService, getAllCardsService } from "@card/services/cardService";
import { useAuth } from "@auth/context/AuthContext";

const CardContext = createContext();

export const CardProvider = ({ children }) => {

    const { isAuthenticated } = useAuth();
    const [cards, setCards] = useState([]);
    const [types, setTypes] = useState([]);


    const getAllCards = async () => {
        try {
            const response = await getAllCardsService();

            setCards(response.cards);
            return response.cards; 
        } catch (error) {
            throw error;
        }
    }

    const cardTypes = async () => {
        try {
            const response =  await cardTypesService();
            setTypes(response.data);
        } catch (error) {
            throw error;
        }
    }

    

    const createCard = async (data) => {
        try {
        
            const response = await createCardService(data);

            return response;

        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        // requestIdleCallback(() => isAuthenticated && )
        getAllCards() && cardTypes()
    }, []);

    const value = {
        cards,
        createCard,
        types,
        getAllCards,
    }

    return(
        <CardContext.Provider value={value} >
            { children }
        </CardContext.Provider>
    );
}

export const useCard = () => {
    const context = useContext(CardContext)

    if(!context) throw new Error("useCard debe estar dentro del proveedor CardProvider");

    return context;
}