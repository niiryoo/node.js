import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './blog.controller';
import { BlogFileRepository, BlogMongoRepository } from './blog.repository';
import { Blog, BlogSchema} from './blog.schema';
import { BlogService } from './blog.service';

@Module({
  imports: [
    // 1. 몽고디비 연결 설정
    MongooseModule.forRoot(
      'mongodb+srv://yoojiin0328:dbwldls0328@cluster0.xkcgvka.mongodb.net/blog',
    ),
    // 2. 몽고디비 스키마 설정
    MongooseModule.forFeature([{name: Blog.name, schema: BlogSchema}]),
  ],
  controllers: [BlogController],
  // 3. 프로바이더 설정 = 다른 곳에서 의존성 주입
  providers: [BlogService, BlogFileRepository, BlogMongoRepository],
})
export class AppModule {}
