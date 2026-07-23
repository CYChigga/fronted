import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserInput } from './user.input';
export declare class UserService {
    private prisma;
    private authService;
    constructor(prisma: PrismaService, authService: AuthService);
    findAll(): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
    }[]>;
    findById(id: number): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
    } | null>;
    findByEmail(email: string): Promise<{
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
    delete(id: number): Promise<{
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
