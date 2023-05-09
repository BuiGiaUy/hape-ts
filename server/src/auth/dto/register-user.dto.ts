import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto {
    readonly id: number ;

    @IsEmail()
    @MaxLength(50)
    @MinLength(5)
    readonly email: string

    @MaxLength(510)
    @MinLength(5)
    readonly token: string

    @MaxLength(16)
    @MinLength(13)
    @IsNotEmpty()
    phone: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    @MinLength(4)
    password: string 
}