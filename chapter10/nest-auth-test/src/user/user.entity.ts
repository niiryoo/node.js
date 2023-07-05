import {Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({unique: true})
    email: string;

    @Column({nullable: true}) //패스워드에 빈 값 허용: 구글 OAuth 인증에는 구글에서 인증을 한 다음 돌아오므로 패스워드를 알 수 없기 떄문
    password: string;

    @Column()
    username: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdDt: Date;

    @Column({nullable: true}) // providerId에 빈 값 허용: OAuth로 가입하지 않은 경우에는 모르는 값이기에 빈 값 허용
    providerId: string; // providerId 추가: OAuth 인증 시 식별자로 사용할 수 있는 값
}