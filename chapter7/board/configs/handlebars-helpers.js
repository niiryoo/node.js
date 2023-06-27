/**핸들바의 장점이자 단점은 자유도가 높음
 * -> 커스텀 헬퍼 함수를 구현해 사용해야 함
 * -> 아래의 3개의 함수가 커스텀 헬퍼 함수
 */

module.exports = {
    // 1. 리스트 길이 반환
    lengthOfList: (list = []) => list.length,
    
    // 2. 두 값을 비교해 같은지 여부를 반환
    eq: (val1, val2) => val1 == val2,

    // 3. ISO 날짜 문자열에서 날짜만 반환
    dataString: (isoString) => new Date(isoString).toLocaleDateString(),
};