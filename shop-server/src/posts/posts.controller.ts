import { Controller, Get, Post, Body, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import PostDtoDto from './dto/PostDto.dto';
import idDtoDto from './dto/idDto.dto';
@Controller('posts')
export class PostsController {
    constructor (private readonly postsService: PostsService) {}
    @Get()
    givePosts(){
        return this.postsService.givePosts()
    }
    @UsePipes(new ValidationPipe({transform:true}))
    @Post()
    async createPost(@Body() postDto: PostDtoDto){
        return await this.postsService.createPost(postDto)
    }
    @Delete()
    deletePost(@Body() idDto: idDtoDto){
        return this.postsService.deletePost(idDto)
    }
}
