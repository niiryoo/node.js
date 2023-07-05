import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
    
    constructor(private authService: AuthService){}

    async canActivate(context: any): Promise<boolean> {
        
        const request = context.switchToHttp().getRequest();

        if(request.cookies['login']){
            return true;    
        }

        if(!request.body.email || !request.body.password){
            return false;
        }

        const user = await this.authService.validatedUser(
            request.body.email,
            request.body.password,
        );

        if(!user){
            return false;
        }

        request.user = user;
        return true;
    }
}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){ // AuthGuard 상속
    async canActivate(context: any): Promise<boolean>{
        const result = (await super.canActivate(context)) as boolean;
        //로컬 strategy 실행
        
        const request = context.switchToHttp().getRequest();
        await super.logIn(request); // 세션 저장
        return result;
    }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        return request.isAuthenticated(); // 세션에서 정보를 읽어서 인증 확인
    }
}

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google'){ // Google Strategy 사용
    async canActivate(context: any): Promise<boolean>  {
        const result = (await super.canActivate(context)) as boolean; //부모 클래스의 메서드 사용

        const request = context.switchToHttp().getRequest(); // context에서 request 객체를 꺼내
        return result;
        
    }
}