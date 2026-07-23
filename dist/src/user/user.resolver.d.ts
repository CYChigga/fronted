import { CreateUserInput } from './user.input';
import { UserService } from './user.service';
export declare class UserResolver {
    private userService;
    constructor(userService: UserService);
    getUsers(): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
    }[]>;
    getUser(id: number): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
    } | null>;
    getUserByEmail(email: string): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
    } | null>;
    create(input: CreateUserInput): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
    }>;
    remove(id: number): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
    }>;
    login(email: string, password: string): Promise<{
        success: boolean;
        message: string;
        user: null;
        token: null;
    } | {
        success: boolean;
        message: string;
        user: {
            email: string;
            name: string;
            password: string;
            id: number;
        };
        token: string;
    }>;
}
