async function myName(){
    return "YOOJIIN";
}

async function showName(){
    const name = await myName();
    console.log(name);
}

function waitOneSecond(msg){ // 1. 1초 대기하고 메시지 출력
    return new Promise((resolve, _) => {
        setTimeout(() => resolve(`${msg}`), 1000); 
        /**setTimeout()에는 반환값이 없기에 Promise 객체를 직접 생성. 
         * 이때 직접 Promise를 만들어서 반환하므로 async를 붙여주지 않아도 됨.
         * reject를 사용하지 않기 때문에 _로 사용하지 않음을 표시
        */
    });
}

async function countOneToTen(){ // 2. 10초 동안 1초마다 메시지 출력
    for(let x of [...Array(10).keys()]){ // 3. 0부터 9까지 루프를 순회
        // 4. 1초 대기 후 result에 결괏값 저장
        let result = await waitOneSecond(`${x + 1}초 대기 중...`);
        console.log(result);

    }
    console.log("완료");
}

countOneToTen();