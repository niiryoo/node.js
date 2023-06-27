// 글쓰기
async function writePost(collection, post){ // 1. 글쓰기 함수
    // 생성일시와 조회수를 넣어줍니다.
    post.hits = 0;
    post.createdDt = new Date().toISOString(); // 2. 날짜는 ISO 포맷으로 저장
    return await collection.insertOne(post); // 3. 몽고디비에 post를 저장 후 결과 반환
}

module.exports= { // 4.require()로 파일을 임포트 시 외부로 노출하는 객체
    writePost,
};