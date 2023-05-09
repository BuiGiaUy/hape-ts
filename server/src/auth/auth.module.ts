/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchModule } from 'src/search/search.module';
import { Users } from 'src/users/users.entity';
import { LoginService } from './login.service';
import { RegisterService } from './register.service';
import { UsersService } from 'src/users/users.service';
import { RecaptchaService } from './recaptcha.service';
import { ShopService } from 'src/shop/shop.service';
import { LoginController } from './login.controller';
import { RegisterController } from './register.controller';
import { JwtStrategy } from './strategy/jwt.stategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Users]),
    PassportModule.register({ defaultStrategy: "jwt", session: false })
    JwtModule.register({
      secret: proccess.env.SECRET_KEY_JWT,
      signOptions: {
        expiresIn: process.env.EXPIRES_IN_JWT,
      }
    }),
    SearchModule
  ],
  controllers: [
    LoginService,
    RegisterService,
    UsersService,
    RecaptchaService,
    JwtStrategy,
    ShopService
  ],
  providers: [LoginController, RegisterController],
})
export class AuthModule {}
