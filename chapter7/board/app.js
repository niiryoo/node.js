const express = require("express");
const handlebars = require("express-handlebars");
const app = express();

const mongodbConnection = require("./configs/mongodb-connection");

app.engine(
    "handlebars",
    handlebars.create({ //1. 핸들바 생성 및 엔진 반환
        helpers: require('./configs/handlebars-helpers'),
    }).engine,
); 
app.set("view engine", "handlebars"); // 2. 웹페이지 로드 시 사용할 템플릿 엔진 설정
app.set("views", __dirname + "/views"); // 3. 뷰 디렉터리를 views로 설정

// 4. 라우터 설정
app.get("/", (req, res) => {
    res.render("home", {title: "테스트 게시판", message: "만나서 반갑습니다! "});
});

app.get('/write',(req, res) => {
    res.render("write", {title: "테스트 게시판"});
});

app.get('/detail/:id', async(req, res)=>{
    res.render("detail",{title: "테스트 게시판"});
});

let collection;
app.listen(3000, async()=>{
    console.log("Server started");
    // 2. mongodbConnection()의 결과는 mongoClient
    const mongoClient = await mongodbConnection();
    // 3.mongoClient.db()로 디비 선택 collection()으로 컬렉션 선택 후 collection에 할당
    collection = mongoClient.db().collection("post");
    console.log("MongoDB connected");
});