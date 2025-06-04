export const apiConfig = {
    API_URL: import.meta.env.VITE_API_URL,
};

export const reverbConfig = {
    APP_KEY: import.meta.env.VITE_REVERB_APP_KEY,
    HOST: import.meta.env.VITE_REVERB_HOST,
    PORT: Number(import.meta.env.VITE_REVERB_PORT),
    SCHEME: import.meta.env.VITE_REVERB_SCHEME,
};
