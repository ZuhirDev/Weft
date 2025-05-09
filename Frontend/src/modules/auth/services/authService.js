import { get, post } from '@/utils/xhr';

export const registerService = async (data) => {
    const { email, status, type, password, password_confirmation } = data;
    try {
        const response = await post({
            url: '/register',
            data: {
                email,
                status,
                type,
                password,
                password_confirmation,
            }
        });

        return response.data;
    } catch (error) { 
        throw error;
    }
}


export const loginService = async (data) => { console.log("object", data)
    const { email, password } = data;
    try {
        const response = await post({
            url: '/login',
            data: {
                email,
                password,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const logoutService = async () => {
    try {
        const response = await post({url: '/logout'});

        return response.data; 
    } catch (error) {
        throw error;
    }
}

export const enable2FAService = async () => {
    try {
        const response = await post({
            url: '/2fa/enable',
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const verify2FAService = async (otp) => { console.log("otp", otp)
    try {
        const response = await post({
            url: '/2fa/verify',
            data: {
                one_time_password: otp,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const disable2FAService = async () => {
    try {
        const response = await post({ url: '/2fa/disable '});

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const passwordVerificationService = async (data) => {
    const { password } = data;
    try {
        const response = await post({
            url: '/validate-password',
            data: {
                password,
            }
        });
        
        return response.data;
    } catch (error) {
        throw error;
    }
}
