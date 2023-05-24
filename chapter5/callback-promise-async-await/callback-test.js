const DB = [];

//회원가입 API 함수
function register(user){ // 1. 콜백이 3중으로 중첩된 함수
    return saveDB(user, function(user){ // 콜백
        return sendEmail(user,function(user){ //콜백
            return getResult(user); //콜백
        });
    });
}

// 2. DB에 저장한 후 콜백 실행
function saveDB(user, callback){
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    return callback(user);
}

// 3. 이메일 발송 로그만 남기는 코드 실행 후 콜백 실행
function sendEmail(user, callback){
    console.log(`email to ${user.email}`);
    return callback(user);
}

// 4. 결과를 반환하는 함수
function getResult(user){
    return `success register ${user.name}`;
}

const result = register({email: "yoojiin0328@naver.com", password: "1234", name:"Janice"});
console.log(result);