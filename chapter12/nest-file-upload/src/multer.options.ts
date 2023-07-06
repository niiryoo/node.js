import { randomUUID } from "crypto";
import { diskStorage } from "multer";
import {extname, join} from 'path';

export const multerOption = { //multerOption 객체 선언. multer의 옵션은 객체 형태로 만들어짐
    storage: diskStorage({ // disk Storage 사용.
        destination: join(__dirname, '..', 'uploads'), // 파일의 저장 경로는 최상단 경로의 [uploads] 디렉터리
        filename: (req, file, cb) => {
            cb(null, randomUUID() + extname(file.originalname));
             // 파일명은 randomUUID() 함수로 랜덤한 이름을 지어주고,
             //extname() 함수를 사용해 파일의 확장자를 붙여줌
        },
    }),
};