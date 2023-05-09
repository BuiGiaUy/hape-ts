import { IsString, MaxLength } from 'class-validator';

export class LoginByPartyDto {
  @IsString()
  @MaxLength(10)
  readonly party: string;

  @IsString()
  @MaxLength(250)
  readonly accessToken: string;
}
