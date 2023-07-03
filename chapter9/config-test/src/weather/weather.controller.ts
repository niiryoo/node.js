import { Controller, Get } from '@nestjs/common';
import { ConfigService} from '@nestjs/config'; // 1. ConfigService import

@Controller('weather')
export class WeatherController {
    constructor(private configService: ConfigService) {} // 2. 의존성 주입

    @Get()
    public getWeather(): string {
        // 3. 환경 변숫값 가져오기
        const apiUrl = this.configService.get('WEATHER_API_URL');
        const apiKey = this.configService.get('WEATHER_API_KEY');

        // 4. 내부 함수인 callWeatherAPI()를 호출
        return this.callWheatherApi(apiUrl, apiKey);

    }

    private callWheatherApi(apiUrl: string, apiKey: string): string {
        console.log('날씨 정보 가져오는 중 ...');
        console.log(apiUrl);
        console.log(apiKey);
        return '내일은 맑음';

    }
}
