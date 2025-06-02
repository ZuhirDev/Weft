import { get, post, put } from "@/utils/xhr";


export const getAllCardsService = async () => {
    try {
        const response = await get({
            url: '/card/all',
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createCardService = async (data) => {
    const { iban, alias, type } = data; console.log("alias", alias)
    try {
        const response = await post({
            url: 'card/store',
            data: {
                iban,
                alias,
                type,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const showPinCardService = async (data) => {
    const { card_number } = data;
    try {
        const response = await post({
            url: 'card/pin',
            data: {
                card_number,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updatePinCardService = async (data) => {
    const { card_number, new_pin } = data;
    try {
        const response = await put({
            url: 'card/pin',
            data: {
                card_number,
                new_pin,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateCardService = async (data) => {
    const { card_number, alias, status } = data;
    try {
        const response = await post({
            url: 'card/update',
            data: {
                card_number,
                alias,
                status,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const cardTypesService = async () => {
    try {
        const response = await get({ url: '/card/types'});

        return response.data;
    } catch (error) {
        throw error;
    }
}