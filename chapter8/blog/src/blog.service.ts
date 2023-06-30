import { PostDto } from "./blog.model"; // 1. 게시글의 타입 정보 import

export class BlogService { 
    posts = []; // 2. 게시글 배열 선언

    getAllPosts(){ // 3. 모든 게시글 가져오기
        return this.posts;
    }

    createPost(postDto : PostDto){ // 4. 게시글 작성
        const id = this.posts.length + 1;
        this.posts.push({ id: id.toString(), ...postDto, createdDt: new Date()});
    }

    getPost(id){ // 5. 게시글 하나 가져오기
        const post = this.posts.find((post) => {
            return post.id === id;
        });
        console.log(post);
        return post;
    }

    delete(id){ // 6. 게시글 삭제
        const filteredPosts = this.posts.filter((post) => post.id !== id);
        this.posts = [...filteredPosts];
    }

    updatePost(id, postDto: PostDto){ // 7. 게시글 업데이트
        let updateIndex = this.posts.findIndex((post) => post.id === id);
        const updatePost = {id, ...postDto, updateDt: new Date()};
        this.posts[updateIndex] = updatePost;
        return updatePost;

    }
}