export interface User extends Record<string, unknown> {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    user_id: string;
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    address?: string;
}

