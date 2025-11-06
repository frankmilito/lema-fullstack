export interface User extends Record<string, unknown> {
    id: number;
    user_id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    address?: string;
}

