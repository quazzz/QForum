import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import PostDtoDto from './dto/PostDto.dto';
import { BadRequestException } from '@nestjs/common';
@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}
     givePosts() {
        return this.prisma.post.findMany() 
    }

    async createPost(postDto: PostDtoDto){
        if(!postDto || !postDto.title || !postDto.content){
            throw new BadRequestException('Title and content are required')
        }
        const post = await this.prisma.post.create({
            data: postDto
        })
        return post
    }
    async deletePost(idDto: {id: string}){
        const post = await this.prisma.post.delete({
            where: {
                id: idDto.id
            }
        })
        return post
    }
}
