import { get, post } from "@/utils/xhr";

export const cardPaymentService = async (data) => {
    const { card_number, amount, concept } = data;
    try {
        const response = await post({
            url: '/card/transaction/payment',
            data: {
                card_number,
                amount,
                concept,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const allTransactionsCard = async (data) => {
    const { card_number } = data;
    try {
        const response = await post({
            url: '/card/transaction/all',
            data: {
                card_number,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}


export const latestTransactionsService = async () => {
    try {
        const response = await get({ url: '/transactions/latest' });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const depositService = async (data) => {
    const { iban, type, amount, concept } = data;
    try {
        const response = await post({
            url: '/account/transaction/deposit',
            data: {
                iban, 
                type, 
                amount, 
                concept,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const withdraeService = async (data) => {
    const { iban, type, amount, concept } = data;

    try {
        const response = await post({
            url: '/account/transaction/withdraw',
            data: {
                iban, 
                type, 
                amount, 
                concept,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const transferService = async (data) => {
    const { iban, destination_iban, type, amount, concept } = data;

    try {
        const response = await post({
            url: '/account/transaction/transfer',
            data: {
                iban,
                destination_iban,
                type, 
                amount, 
                concept,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const externalTransferService = async (data) => { 
    const { iban, destination_iban, type, amount, concept } = data;

    try {
        const response = await post({
            url: '/account/transaction/external-transfer',
            data: {
                iban,
                external_iban: destination_iban,
                type, 
                amount, 
                concept,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}