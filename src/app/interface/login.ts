export interface Login {
    email: string;
    password: string;
}
export interface Register {
    name: string;
    email: string;
    password: string;
}

export interface User{
    id: number;
    name: string;
    email: string;
}

export interface Deslogueo{
    token: string | null;
}

export interface token{
    access_token: string|null;
}