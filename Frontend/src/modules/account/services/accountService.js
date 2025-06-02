import { del, get, post, put } from "@/utils/xhr";


export const getAllAccountsService = async () => {
    try {
        const response = await get({
            url: '/account/all',
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createAccountService = async (data) => {
    const { alias, type } = data;
    try {
        const response = await post({
            url: 'account/create',
            data: {
                alias,
                type,
            }
        });
        
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteAccountService = async (data) => {
    const { iban } = data;
    try {
        const response = await del({
            url: 'account/destroy',
            data: {
                iban,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateAccountService = async (data) => {
    const { alias, status, iban } = data;
    try {
        const response = await put({
            url: 'account/update',
            data: {
                iban,
                alias,
                status,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}