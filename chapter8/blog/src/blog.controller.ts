// 1. 데코레이터 함수 임포트
import { Controller, Param, Body, Delete, Get, Post, Put } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller('blog') // 2. 클래스에 붙이는 Controller 데코레이터, {서버 주소}/blog 이하의 요청을 처리한다라는 의미
export class BlogController{

    constructor(private blogService: BlogService){}

    @Get() // 3. Get 요청 처리
    getAllPosts(){
        console.log('모든 게시글 가져오기');
        return this.blogService.getAllPosts();
    }

    @Post() // 4. Post 요청 처리
    createPost(@Body() postDto){ // 5. HTTP 요청의 body 내용을 post에 할당
        console.log('게시글 작성');
        this.blogService.createPost(postDto);
        return 'success';
    }


    @Get('/:id') // 6. GET에 URL 매개변수에 id가 있는 요청 처리
    async getPost(@Param('id') id: string){
        console.log(`게시글 하나 가져오기`);
        
        const post = await this.blogService.getPost(id);
        console.log(post);
        return post;
    }

    @Delete('/:id') // 7. DELETE 방식에 URL 매개변수로 id가 있는 요청 처리
    deletePost(@Param('id') id: string){
        console.log('게시글 삭제');
        this.blogService.delete(id);
        return 'success';
    }

    @Put('/:id')
    updatePost(@Param('id') id: string, @Body() postDto){ // 8. PUT 방식에 URL 매개변수로 전달된 id가 있는 요청 처리
        console.log(`게시글 업데이트`, id, postDto);
        return this.blogService.updatePost(id, postDto);

    }
}