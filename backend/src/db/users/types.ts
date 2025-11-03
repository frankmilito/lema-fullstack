export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;

  street?: string;
  city?: string;
  zipcode?: string;
  state?: string;

  address?: string
}