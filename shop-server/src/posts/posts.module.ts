import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService, {provide: APP_GUARD, useClass: AuthGuard}]
})
export class PostsModule {}
