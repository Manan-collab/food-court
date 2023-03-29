import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateAuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    contact: string;

    @IsString()
    @IsNotEmpty()
    password: string;
} 

export class loginDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}