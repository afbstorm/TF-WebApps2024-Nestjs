import {IsEmail, IsOptional, IsString, IsUUID} from "class-validator";


export class UpdateUserDto {

    @IsString()
    @IsOptional()
    firstname: string;

    @IsString()
    @IsOptional()
    lastname: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    secret: string;
}
