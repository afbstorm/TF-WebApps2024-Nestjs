import {IsEmail, IsString} from "class-validator";


export class RegisterUserDto {

    @IsString()
    firstname: string;

    @IsString()
    lastname: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    secret: string;
}
