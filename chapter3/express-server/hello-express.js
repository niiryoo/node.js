const express = require("express"); //express 모듈 불러오기
const app = express(); //express 초기화 후 app에 할당
const port = 3000;

app.get("/", (req, res) => {
    res.set({"Content-Type": "text/html; charset=utf-8"});
    res.end("Hello Express!");
});

app.listen(port, ()=>{
    console.log(`START SERVER :use ${port}`);
})