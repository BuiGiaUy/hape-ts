import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt.payload';
import { LoginService } from '../login.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loginService: LoginService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY_JWT,
    });
  }
  async validate(payload: JwtPayload) {
    const user = await this.loginService.validateUserByJwt(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
