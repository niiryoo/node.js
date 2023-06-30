import { PostDto } from "./blog.model"; // 1. 게시글의 타입 정보 import
import { BlogFileRepository, BlogRepository } from "./blog.repository";

export class BlogService { 
    posts = []; // 2. 게시글 배열 선언
    blogRepository: BlogRepository;

    constructor(){
        this.blogRepository = new BlogFileRepository();
    }

     async getAllPosts(){ // 3. 모든 게시글 가져오기
        return await this.blogRepository.getAllPost();
    }

    createPost(postDto : PostDto){ // 4. 게시글 작성
        this.blogRepository.createPost(postDto);
    }

    async getPost(id){ // 5. 게시글 하나 가져오기
        return await this.blogRepository.getPost(id);
    }

    delete(id){ // 6. 게시글 삭제
        this.blogRepository.deletePost(id);
    }

    updatePost(id, postDto: PostDto){ // 7. 게시글 업데이트
        this.blogRepository.updatePost(id, postDto);

    }
}