import { Controller, Get } from "@nestjs/common"; // 1. 필요한 함수 import

@Controller() // 2. 컨트롤러 데코레이터
export class HelloController{ // 3. 컨트롤러 클래스는 Module에서 포함되어야 하므로 export를 붙여서 다른 클래스에서 불러올 수 있게 함
    @Get() 
    hello(){
        return "안녕하세요. NestJS로 만든 첫 애플리케이션입니다.";
    }
}