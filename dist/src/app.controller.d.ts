import { PrismaService } from './prisma.service';
export declare class AppController {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
    }>;
    findAll(): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
    }[]>;
    remove(): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
