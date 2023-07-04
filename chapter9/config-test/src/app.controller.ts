import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // 1. ConfigService 임포트


@Controller()
export class AppController {
  constructor(private configService: ConfigService) {} // 2. ConfigService 주입

  @Get()
  getHello(): string { // 핸들러 함수 getHello()
    const message = this.configService.get('MESSAGE'); // 3. configService.get() 호출
    console.log(message);
    return message;
  }

  @Get('service-url') // 1. http://localhost:3000/service-url 경로 진입 시 실행
  getServiceUrl(): string{
    console.log("SERVICE-URL의 값: " + this.configService.get("SERVICE_URL"));
    return this.configService.get("SERVICE_URL"); // 2. SERVICE_URL 환경 변수 반환
  }

  @Get('db-info')
  getTest(): string{
    console.log(this.configService.get('logLevel'));
    console.log(this.configService.get('apiVersion'));
    console.log(this.configService.get('db-Info'));
    return this.configService.get('dbInfo');
  }

}
