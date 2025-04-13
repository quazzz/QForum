import { Body, Controller, Post, Req, Res, Get } from '@nestjs/common';
import UserDto from './dto/User.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('register')
    Register(@Body() userDto: UserDto ){
        return this.authService.Register(userDto)
    }
    @Post('login')
    Login(@Body() userDto: UserDto, @Res() res: Response){
        return this.authService.Login(res, userDto)
    }
    @Get('userInfo')
    GiveUserInfo(@Req() req){
        return this.authService.giveUserInfo(req)
    }
}
