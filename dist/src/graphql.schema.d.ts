export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
}
export interface User {
    id: number;
    name: string;
    email: string;
}
export interface IQuery {
    users(): User[] | Promise<User[]>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
    userByEmail(email: string): Nullable<User> | Promise<Nullable<User>>;
}
export interface LoginResult {
    success: boolean;
    message: string;
    user?: Nullable<User>;
    token?: Nullable<string>;
}
export interface IMutation {
    login(email: string, password: string): LoginResult | Promise<LoginResult>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    deleteUser(id: number): User | Promise<User>;
}
type Nullable<T> = T | null;
export {};
