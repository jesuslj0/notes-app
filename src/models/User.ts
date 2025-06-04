export interface User {
    id: string,
    name: string,
    email: string,
}

export interface UserLogin {
    email: string,
    password: string
} 

export interface UserRegister {
    name: string,
    email: string,
    password: string,
}

export const EmptyUser: User = {
    id: '',
    name: '',
    email: '',
}
