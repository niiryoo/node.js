import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';


console.log('env : ' + process.env.NODE_ENV);
console.log('current working directory : ' + process.cwd()); // 1. 현재 디렉터리의 절대경로 출력

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `envs/${process.env.NODE_ENV}.env`, // 2. 환경 변수 파일 경로 지정
  }),
  WeatherModule,
  ], // 1. ConfigModule 설정 (전역 모듈 설정 추가)
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
