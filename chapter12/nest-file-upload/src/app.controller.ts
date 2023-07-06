import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { multerOption } from './multer.options';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/file-upload') // POST 메서드로 localhost:3000/file-upload 호출 시 동작
  @UseInterceptors(FileInterceptor('file',  multerOption)) 
  // 인터셉터는 클라이언트와 서버 간의 request, response 간에 로직을 추가하는 미들웨어.
  // FileInterceptor()는 클라이언트 요청에 따라 파일명이 file인 파일이 있는지 확인하고 함수의 인수로 넘겨줌
  fileUpload(@UploadedFile() file: Express.Multer.File){ 
    // @UploadFile() 데코레이터는 핸들러 함수의 매개변수 데코레이터.
    // 인수로 넘겨진 값 중 file 객체를 지정해 꺼내는 역할. 각 파일의 타입: Express.Multer.File 타입
    
    console.log(file);
    return 'File Upload'
  }
}
