const express = require("express");
const handlebars = require("express-handlebars");
const mongodbConnection = require("./configs/mongodb-connection");
const { ObjectId } = require("mongodb");

const app = express();
const postService = require('./services/post-service'); // 1. 서비스 파일 로딩
const { Collection } = require("mongoose");

//POST 메서드 사용 시, 데이터를 req.body로 넘기는데, 해당 데이터를 사용하려면 express 미들웨어를 설정해야 함
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine(
    "handlebars",
    handlebars.create({ //1. 핸들바 생성 및 엔진 반환
        helpers: require('./configs/handlebars-helpers'),
    }).engine,
); 
app.set("view engine", "handlebars"); // 2. 웹페이지 로드 시 사용할 템플릿 엔진 설정
app.set("views", __dirname + "/views"); // 3. 뷰 디렉터리를 views로 설정

let collection;
app.listen(3000, async()=>{
    console.log("Server started");
    // 2. mongodbConnection()의 결과는 mongoClient
    const mongoClient = await mongodbConnection();
    // 3.mongoClient.db()로 디비 선택 collection()으로 컬렉션 선택 후 collection에 할당
    collection = mongoClient.db().collection("post");
    console.log("MongoDB connected");
});

// 4. 라우터 설정, 리스트 페이지
app.get("/", async(req, res) => {
    const page = parseInt(req.query.page) || 1; // 1.현재 페이지 데이터
    const search = req.query.search || ""; // 검색어 데이터
    try{
        // 2. postServie.list에서 글 목록과 페이지네이터를 가져옴
        const [posts, paginator] = await postService.list(collection, page, search);

        // 3. 리스트 페이지 렌더링
        res.render("home", {title: "테스트 게시판", search, paginator, posts});
    } catch(error){
        console.log(error);
        res.render("home", {title: "테스트 게시판"});
    }
});

// 1. 쓰기 페이지 이동 mode는 create
app.get('/write',(req, res) => {
    res.render("write", {title: "테스트 게시판", mode:"create"});
});

//글쓰기
app.post('/write', async(req, res) => {
    const post = req.body;
    // 2. 글쓰기 후 결과 반환
    const result = await postService.writePost(collection, post);
    // 3. 생성된 도큐먼트의 _id를 사용해 상세페이지로 이동
    res.redirect(`/detail/${result.insertedId}`);
});


// 2. 상세 페이지 안 수정 페이지로 이동 mode는 modify
app.get('/modify/:id', async(req, res) => {
    const { id } = req.params.id;
    // 3. getPostById() 함수로 게시글 데이터를 받아옴
    const post = await postService.getPostById(collection, req.params.id);
    console.log(post);
    res.render("write", {title: "테스트 게시판", mode:"modify", post});
});

// 4. 게시글 수정 API
app.post("/modify/", async(req, res) => {
    const { id, title, writer, password, content} = req.body;

    const post = {
        title,
        writer,
        password,
        content,
        createdDt: new Date().toISOString(),
    };

    // 5. 업데이트 결과
    const result = postService.updatePost(collection, id, post);
    res.redirect(`/detail/${id}`);
});

//패스워드 체크
// 1. id, password 값을 가져옴
app.post("/check-password", async(req, res)=>{
    const {id, password} = req.body;

    // 2. postService의 getPostByIdAndPassword() 함수를 사용해 게시글 데이터 확인
    const post = await postService.getPostByIdAndPassword(collection, {id, password});
    
    //데이터가 있으면 isExist true, 없으면 isExist false
    if (!post){
        return res.status(404).json({isExist: false});
    } else{
        return res.json({isExist: true});
    } 
});

app.delete("/delete", async(req, res) => {
    const { id, password} = req.body;
    try{
        // 1. collection의 deleteOne를 사용해 게시글 하나를 삭제
        const result = await collection.deleteOne({
            _id:ObjectId(id),
            password: password,
        });
        // 2.삭제 결과가 잘 못된 경우의 처리
        if(result.deletedCount !== 1){ // .deleteOne의 결과는 deletedCount의 반환 (deleteCount가 1이면 성공, 아니면 실패)
            console.log("삭제 실패");
            return res.json({isSuccess: false});
        }
        return res.json({isSuccess: true});
    } catch (error){
        // 3. 에러가 난 경우의 처리
        console.error(error);
        return res.json({isSuccess: false});
    }
});



// 상세 페이지로 이동
app.get('/detail/:id', async(req, res)=>{
    // 1. 게시글 정보 가져오기
    const result = await postService.getDetailPost(collection, req.params.id);
    res.render("detail", {
        title: "테스트 게시판",
        post: result.value,
    });
});

// 댓글 추가
app.post("/write-comment", async(req, res)=>{
    const {id, name, password, comment} = req.body; // 1. body에서 데이터를 가져오기
    const post = await postService.getPostById(collection, id); // 2. id로 게시글 정보 가져오기

    if(post.comments){
        post.comments.push({
            idx: post.comments.length + 1,
            name,
            password,
            comment,
            createdDt: new Date().toISOString(),
        });
    } else{
        // 4. 게시글에 댓글 정보가 없으면 리스트에 댓글 정보 추가
        post.comments = [
            {
                idx: 1,
                name,
                password,
                comment,
                createdDt: new Date().toISOString(),
            },
        ];
    }
    // 5. 업데이트하기. 업데이트 후에는 상세페이지로 다시 리다이렉트
    postService.updatePost(collection, id, post);
    return res.redirect(`/detail/${id}`);
});