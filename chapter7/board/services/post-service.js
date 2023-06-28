// 글쓰기
const paginator = require('../utils/paginator');

// 글 목록
async function list(collection, page, search){
    /*한 페이지에 노출할 글 개수*/
    const perPage = 10;/*한 페이지에 노출할 글 개수*/
    
    // 1.  title이 search와 부분일치하는지 확인
    const query = {title: new RegExp(search, "i")};
    
    // 2. limit는 10개만 가져온다는 의미, skip은 설정된 개수만큼 건너뛴다(skip).
    // 생성일 역순으로 정렬
    const cursor = collection.find(query, {limit: perPage, skip: (page-1)*perPage}).sort({
        createdDt: -1,
    });

    // 3. 검색어에 걸리는 게시물의 총합
    const totalCount = await collection.count(query);
    
    // 4.커서로 받아온 데이터를 리스트로 변경
    const posts = await cursor.toArray();
    
    // 5. 페이지네이터 생성
    const paginatorObj = paginator({totalCount, page, perPage: perPage});
    return [posts, paginatorObj];

}

async function writePost(collection, post){ // 1. 글쓰기 함수
    // 생성일시와 조회수를 넣어줍니다.
    post.hits = 0;
    post.createdDt = new Date().toISOString(); // 2. 날짜는 ISO 포맷으로 저장
    return await collection.insertOne(post); // 3. 몽고디비에 post를 저장 후 결과 반환
}


module.exports= { // 4.require()로 파일을 임포트 시 외부로 노출하는 객체
    list,
    writePost,
};