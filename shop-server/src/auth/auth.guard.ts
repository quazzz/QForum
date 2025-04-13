import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { IS_PUBLIC_KEY } from "src/posts/decorators/SetMetaData";
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}
    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY,[
            context.getHandler(),
            context.getClass()
        ])
        if(!isPublic){
            return true
        }
        const req = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(req)
        if(!token){
            throw new UnauthorizedException()
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET
                }
            )
            req['user'] = payload
        } catch (error) {
            throw new UnauthorizedException()
        }
        return true;
    }
    private extractTokenFromHeader(req: Request) : string | undefined {
        const [type,token] = req.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token: undefined;
    }
}