import axios, { type AxiosError } from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
});

if (import.meta.env.DEV) {
    api.interceptors.request.use(
        (config) => {
            console.debug(`[API] ${config.method?.toUpperCase()} ${config.url}`);
            return config;
        },
        (error) => {
            console.error('[API] Request error:', error);
            return Promise.reject(error);
        }
    );
}

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (import.meta.env.DEV) {
            console.error('[API] Error:', {
                url: error.config?.url,
                method: error.config?.method,
                status: error.response?.status,
                data: error.response?.data,
            });
        }

        let errorMessage = error.message || 'An unexpected error occurred';
        if (error.response?.data && typeof error.response.data === 'object') {
            const responseData = error.response.data as Record<string, unknown>;
            if ('error' in responseData && typeof responseData.error === 'string') {
                errorMessage = responseData.error;
            } else if ('message' in responseData && typeof responseData.message === 'string') {
                errorMessage = responseData.message;
            }
        }

        const apiError = {
            message: errorMessage,
            status: error.response?.status,
            originalError: error,
        };

        return Promise.reject(apiError);
    }
);

export interface ApiError {
    message: string;
    status?: number;
    originalError: AxiosError;
}


