import { BadRequestException, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import UserDto from './dto/User.dto';

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request, Response } from 'express';
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService){}
    async Register(userDto: UserDto) {
        const user = await this.prisma.user.findFirst({
            where : {
                email: userDto.email
            }
        })
        if(user){
            throw new BadRequestException('User already exists')
        }
        const newUser = await this.prisma.user.create({
            data: {
                email: userDto.email,
                password: userDto.password,
                id: Date.now()
            }
        })
        return newUser
    }
    async Login(res: Response, userDto: UserDto) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: userDto.email
            }
        })
        if(!user){
            throw new BadRequestException('No user')
        }
        const payload = {sub: user?.id, email: user?.email}
        res.cookie('access_token', await this.jwtService.signAsync(payload), {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 60 * 60 * 24,
            path: '/'
        })
        return res.json({ message: "Login succesful" })
    }
    giveUserInfo(req: Request) {
        console.log(req.cookies)
        const token = req.cookies?.['access_token'];
        if(!token){
            console.log('NO TOKEN')
            return {
                isGuest: true
            }
        }
        try {
            console.log('TOKEN...',token)
          const user = this.jwtService.verify(token);
          return {user, isGuest: false};
        } catch (err) {
          throw new UnauthorizedException('Invalid JWT');
        }
      }
      
}
