import { IsEmail, IsNumber, IsString } from "class-validator";
import { Unique } from "typeorm";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    contact: string;
}
