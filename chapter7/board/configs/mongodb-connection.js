const { MongoClient } = require("mongodb");
// 1. 몽고디비 연결 주소
const uri = "mongodb+srv://yoojiin0328:dbwldls0328@cluster0.xkcgvka.mongodb.net/board";

module.exports = function (callback){ // 2. 몽고디비 커넥션 연결 함수 반환
    return MongoClient.connect(uri, callback);
}