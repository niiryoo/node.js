/**블로그 게시글의 타입 정의 */
export interface PostDto { // 1. 게시글의 타입을 인터페이스로 정의
    id: String,
    title: String,
    content: String,
    name: String,
    createdDt: Date;
    updatedDt?: Date; // 2. 수정 일시는 필수가 아님
}