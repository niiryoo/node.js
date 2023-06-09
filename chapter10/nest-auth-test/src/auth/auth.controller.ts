import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { AuthenticatedGuard, LocalAuthGuard, LoginGuard, GoogleAuthGuard } from './auth.guard';

@Controller('/auth') // 컨트롤러 생성
export class AuthController {
    constructor(private authService: AuthService){} // AuthService를 주입받음

    @Post('/register') // register 주소로 POST로 온 요청 처리
    // class-validator가 자동으로 유효성 검증
    async register(@Body() userDto: CreateUserDto){
        return await this.authService.register(userDto); // authService를 사용해 user 정보 저장
    }

    @Post('/login')
    async login(@Request() req, @Response() res){
        // validateUser를 호출해 유저 정보 획득
        const userInfo = await this.authService.validatedUser(
            req.body.email,
            req.body.password,
        )

        if(userInfo == undefined) // 유저 정보가 undefined로 회원가입하지 않았을 때
          return res.send({message: 'login fail. 재시도 혹은 회원가입 부탁드립니다.'});
        

        // 유저 정보가 있으면, 쿠키 정보를 Response에 저장
        if(userInfo){
            res.cookie('login', JSON.stringify(userInfo), {
                httpOnly: false, // 브라우저에서 읽을 수 있도록 함
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7day 단위는 밀리초
            });
        }

        return res.send({message: 'login success'});
    }

    @UseGuards(LoginGuard) //  ❶ LoginGuard 사용
    @Post('/login2')
    async login2(@Request() req, @Response() res) {
      
      console.log("login2/req.cookies['login'] : " + req.cookies['login']);
      console.log("login2/userInfo : " + JSON.stringify(req.user));

      if(req.user == undefined){
       return res.send({ message: 'login2 fail.' });
      }


      if (req.user && !req.cookies['login']) {
        // 응답에 쿠키 정보 추가
        res.cookie('login', JSON.stringify(req.user), {
          httpOnly: true,
          // maxAge: 1000 * 60 * 60 * 24 * 7, // 1day
          maxAge: 1000 * 10, // ❸ 로그인 테스트를 고려해 10초로 설정
        });
      }
      
      return res.send({ message: 'login2 success' });
    }
  
    // ❹ 로그인을 한 때만 실행되는 메서드
    @UseGuards(LoginGuard)
    @Get('test-guard')
    testGuard() {
      return '로그인된 때에만 이 글이 보입니다.';
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login3')
    login3(@Request() req){
      return req.user;
    }

    @UseGuards(AuthenticatedGuard)
    @Get('/test-guard2')
    testGuardWithSession(@Request() req){
      return req.user;
    }

    @Get('to-google') // 구글 로그인으로 이동하는 라우터 메서드
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Request() req){}

    @Get('google') // 구글 로그인 후 콜백 실행 후 이동 시 실행되는 라우터 메서드
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Request() req, @Response() res){
      const {user} = req;
      return res.send(user);
    }



}
