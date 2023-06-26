const { MongoClient, ServerApiVersion } = require('mongodb'); // MongoDB 패키지를 IMPORT
const uri = "mongodb+srv://yoojiin0328:dbwldls0328@cluster0.xkcgvka.mongodb.net/?retryWrites=true&w=majority"; // 1. MongoDB 연결 정보


const client = new MongoClient(uri, { // 2. MongoDB 클라이언트 객체 생성
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run(){ // 1. async가 있으므로 비동기 처리 함수
    await client.connect();
    
    const adminDB = client.db('test').admin(); // 2. admin DB 인스턴스
    /** admin() 함수는 admin DB에 인스턴스를 가져올 수 있게 해줌 */

    const listDatabases = await adminDB.listDatabases(); // 3. 데이터베이스 정보 가져오기
    /** admin DB인스턴스에는 listDatabases() 함수가 있꼬, 해당 함수를 실행하면 데이터베이스들의 정보를 반환.
     */
    console.log(listDatabases);
    return "OK";
}

run()
    .then(console.log)
    .catch(console.erre)
    .finally(()=> client.close());
