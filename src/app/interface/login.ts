export interface Login {
    email: string;
    name: string;
    password: string;
}
export interface Register {
    name: string;
    email: string;
    password: string;
    codigo?: number;
}

export interface User{
    id: number;
    name: string;
    email: string;
}

export interface Logout{
    token?: string;
}

export interface token{
    access_token: string|null;
}

export interface UserDataResponse
{
    status: number;
    data: any;
}

export interface UserC {
    id: number;
    name: string;
    email: string;
    token: string;
    
  }