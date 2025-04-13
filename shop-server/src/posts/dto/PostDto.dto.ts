import { IsNotEmpty } from "@nestjs/class-validator";
import { Transform } from 'class-transformer';

export default class PostDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

    @Transform(({ value }) => (value === null || value === undefined ? 'Guest' : value))    
    author: string = 'Guest';
}
