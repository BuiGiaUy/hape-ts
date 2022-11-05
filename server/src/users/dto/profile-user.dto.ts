import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UserProfileDto {
    @IsOptional()
    @IsString()
    @MaxLength(20)
    @MinLength(2)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(13)
    @MinLength(3)
    username: string;

    @IsOptional()
    @MaxLength(14)
    @MinLength(8)
    phone:string;

    @IsOptional()
    @MaxLength(20)
    @MinLength(4)
    shopName: string;

    @IsOptional()
    @IsEmail()
    @MaxLength(100)
    @MinLength(5)
    email:string;
}