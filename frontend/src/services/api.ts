import axios, { type AxiosError } from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
});

// Request interceptor for logging (development only)
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

        const apiError = {
            message: error.response?.data && typeof error.response.data === 'object' && 'error' in error.response.data
                ? (error.response.data as { error: string }).error
                : error.message || 'An unexpected error occurred',
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