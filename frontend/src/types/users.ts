export interface User extends Record<string, unknown> {
    id: string;
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

