import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    signToken(userId: number, email: string): string;
    verifyToken(token: string): {
        sub: number;
        email: string;
    };
}
