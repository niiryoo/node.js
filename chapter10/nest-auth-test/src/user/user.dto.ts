import { IsEmail, IsString } from "class-validator";
export class CreateUserDto{
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    username: string;
}

export class updateUserDto{
    @IsString()
    username: string;

    @IsString()
    password: string;
}