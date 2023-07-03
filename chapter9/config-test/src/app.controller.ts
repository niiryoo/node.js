import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // 1. ConfigService 임포트

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {} // 2. ConfigService 주입

  @Get()
  getHello(): string { // 핸들러 함수 getHello()
    const message = this.configService.get('MESSAGE'); // 3. configService.get() 호출
    return message;
  }
}
