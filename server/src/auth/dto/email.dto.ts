import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class EmailDto {
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(50)
    @MinLength(5)
    readonly email: string;
}