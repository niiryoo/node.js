import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // 리포지토리 의존성 주입 데코레이터
import { User } from './user.entity';
import { Repository } from 'typeorm'; // typeorm의 리포지토리. 저장, 읽기 같은 기본적인 메서드들 제공

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    createUser(user) : Promise<User>{
        return this.userRepository.save(user);
    }

    async getUser(email: string){
        const result = this.userRepository.findOne({
            where: {email},
        });
        return result;
    }

    async updateUser(email: string, _user){
        const user: User = await this.getUser(email);
        console.log(user);

        user.username = _user.username;
        user.password = _user.password;
        console.log(user);

        this.userRepository.save(user);
    }

    deleteUser(email: any){
        return this.userRepository.delete({email});
    }

    async findByEmailOrSave(email, username, providerId): Promise<User>{
        const foundUser = await this.getUser(email); // 이메일로 유저를 찾음
        if(foundUser){
            return foundUser; // 찾았으몀 유저 정보 반환
        }
        
        const newUser = await this.userRepository.save({ //유저 정보 없으면 저장
            email,
            username,
            providerId,
        });
        return newUser; // 저장 후 유저 정보 반환
    } 
}
