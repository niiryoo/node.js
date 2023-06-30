import { BlogFileRepository } from './blog.repository';
import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  imports: [],
  controllers: [BlogController],
  providers: [BlogService, BlogFileRepository],
})
export class AppModule {}
