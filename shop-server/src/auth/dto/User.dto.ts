import { IsEmail, IsNotEmpty, MinLength, IsString } from "@nestjs/class-validator"
export default class{
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string
    @MinLength(8)
    @IsString()
    password: string
}