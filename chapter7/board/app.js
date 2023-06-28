const express = require("express");
const handlebars = require("express-handlebars");
const mongodbConnection = require("./configs/mongodb-connection");

const app = express();
const postService = require('./services/post-service'); // 1. 서비스 파일 로딩

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

//글쓰기 페이지 이동
app.get('/write',(req, res) => {
    res.render("write", {title: "테스트 게시판"});
});

//글쓰기
app.post('/write', async(req, res) => {
    const post = req.body;
    // 2. 글쓰기 후 결과 반환
    const result = await postService.writePost(collection, post);
    // 3. 생성된 도큐먼트의 _id를 사용해 상세페이지로 이동
    res.redirect(`/detail/${result.insertedId}`);
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

//패스워드 체크
// 1. id, password 값을 가져옴
app.post("/check-password", async(req, res)=>{
    const {id, password} = req.body;

    // 2. postService의 getPostByIdAndPassword() 함수를 사용해 게시글 데이터 확인
    const post = await postService.getPostByIdAndPassword(collection, {id, password});
    
    //데이터가 있으면 isExist true, 없으면 isExist false
    if (!post){
        return res.status(400).json({isExist: false});
    } else{
        return res.json({isExist: true});
    }
});