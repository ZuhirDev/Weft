import { get, post, put } from "@/utils/xhr";


export const getAllAccountsService = async () => {
    try {
        const response = await get({
            url: '/account',
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateAccountService = async (data) => { console.log("data service", data)
    try {
        const response = await put({
            url: 'account/update',
            data,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}