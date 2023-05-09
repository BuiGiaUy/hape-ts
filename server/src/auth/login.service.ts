/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IUsers } from 'src/users/interfaces/users.interface';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt.payload';
import { LoginByPartyDto } from './dto/login-by-party.dto';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async validate(loginDto: LoginDto): Promise<IUsers> {
    return await this.usersService.findByEmail(loginDto.email);
  }
  public async loginByParty(
    loginDto: LoginByPartyDto,
  ): Promise<any | { status: number; message: string }> {
    try {
      if (loginDto.party === 'google') {
        return await this.loginByGoogle(loginDto);
      }
      if (loginDto.party === 'facebook') {
        return await this.loginByFacebook(loginDto);
      }
    } catch (err) {
      console.log(err);
      return {
        message: err.message,
        status: 400,
      };
    }
  }
  isAdmin(userID: number) {
    return process.env.ADMIN_ID.split(',').includes(String(userID));
  }
  public async login(
    loginDto: LoginDto,
    role = '',
  ): Promise<any | { status: number; message: string }> {
    return this.validate(loginDto).then((userData) => {
      if (!userData) {
        throw new UnauthorizedException();
      }
      const passwordIsValid = bcrypt.compareSync(
        loginDto.password,
        userData.password,
      );

      if (!passwordIsValid == true) {
        return {
          message: ' Authentication failed. Wrong password',
          status: 400,
        };
      }
      const payload: JwtPayload = {
        id: userData.id,
      };

      if (role == 'admin') {
        if (this.isAdmin(userData.id)) {
          payload['role'] = 'admin';
        } else {
          return {
            message: 'Authentication failed. Wrong password',
            status: 400,
          };
        }
      }
      const accessToken = this.getAccessToken(payload);
      return {
        expiresIn: process.env.EXPIRES_IN_JWT,
        accessToken: accessToken,
        user: {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          phone: userData.phone,
          avatar: userData.avatar,
          name: userData.name,
        },
        status: 200,
      };
    });
  }
  public getAccessToken(payload: JwtPayload) {
    return this.jwtService.sign({
      id: payload.id,
      role: payload.role ? payload.role : 'user',
    });
  }
  public async validateUserByJwt(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.createJwtPayload(user);
  }
  protected createJwtPayload(user) {
    const data: JwtPayload = {
      id: user.id,
    };
    const jwt = this.jwtService.sign(data);
    return {
      expiresIn: process.env.EXPIRES_IN_JWT,
      id: user.id,
      token: jwt,
    };
  }
  protected async loginByFacebook(loginDto: LoginByPartyDto) {
    try {
      const { data } = await axios.get(`https://graph.facebook.com/v2.3/me`, {
        params: {
          access_token: loginDto.accessToken,
          fields: 'name,email,picture',
          locale: 'en_US',
          method: 'get',
          sdk: 'joey',
          suppress_http_code: 1,
        },
      });

      if (data.id) {
        const avatar = data.picture.data.url;
        const name = data.name;
        const email = data.email;
        const facebook_id = data.id;

        // check existing email or google ID
        let user = await this.usersService.findOne({ facebook_id });
        //  if not exist let create a new user
        if (!user) {
          let r = Math.random().toString(36).substring(7);
          const username = await this.usersService.getUniqueUserName(data.name);
          const userDto = {
            avatar,
            name,
            email,
            email_key: true,
            email_verify: true,
            username,
            phone: null,
            password: r,
            facebook_id: data.id,
          };
          userDto.password = bcrypt.hashSync(userDto.password, 8);
          user = await this.usersService.create(userDto);
        }
        if (user) {
          let fields: any = {
            avatar,
          };
          if (user.facebook_id === null) {
            fields.facebook_id = facebook_id;
          }
          await this.usersService.saveByField(user.id, fields);
        }

        //return user and accessToken
        const payload: JwtPayload = {
          id: user.id,
        };

        const accessToken = this.getAccessToken(payload);
        //remove unused fields and return to client
        delete user.password;
        return {
          accessToken,
          user,
          expiresIn: process.env.EXPIRES_IN_JWT,
          status: 200,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        status: 400,
      };
    }
  }
  protected async loginByGoogle(loginDto: LoginByPartyDto) {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/userinfo/v2/me`,
        {
          headers: { Authorization: `Bearer ${loginDto.accessToken}` },
        },
      );
      if (data.verified_email) {
        const avatar = data.picture;
        const name = data.name;
        const email = data.email;
        const google_id = data.id;
        //check existing email or google ID
        let user = await this.usersService.findOne({ google_id });
        // if not exist let create a new user
        if (!user) {
          let r = Math.random().toString(36).substring(7);
          const username = await this.usersService.getUniqueUserName(data);
          const userDto = {
            avatar,
            name,
            email,
            email_key: true,
            email_verify: true,
            username,
            phone: null,
            password: r,
            google_id: data.id,
          };
          userDto.password = bcrypt.hashSync(userDto.password, 8);
          user = await this.usersService.create(userDto);
        }
        if (user) {
          let fields: any = {
            name,
            avatar,
          };
          if (user.google_id == null) {
            fields.google_id = google_id;
          }
          await this.usersService.saveByField(user.id, fields);
        }

        //return user and accessToken
        const payload: JwtPayload = {
          id: user.id,
        };
        const accessToken = this.getAccessToken(payload);
        //remove unused fields and return to client
        delete user.password;
        return {
          accessToken,
          user,
          expiresIn: process.env.EXPIRES_IN_JWT,
          status: 200,
        };
      }
    } catch (err) {
      console.log(err);
      return {
        message: err.message,
        status: 400,
      };
    }
  }
}
