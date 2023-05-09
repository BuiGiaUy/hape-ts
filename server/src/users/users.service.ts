import { UserProfileDto } from './dto/profile-user.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as cleanTextUtils from 'clean-text-utils';
import { IUsers } from './interfaces/users.interface';
import { User } from './users.entity';

const ES_INDEX_USER = 'users';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    readonly esService: SearchService,
    readonly shopService: ShopService,
  ) {}

  public async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }
    return user;
  }

  async createOnES(user: any) {
    try {
      const now = new Date();
      const createdAt = now.toISOString();
      const userID = user.id;
      const record: any = [
        {
          index: {
            _index: ES_INDEX_USER,
          },
        },
        {
          ...user,
          userID,
          updateAt: createdAt,
          createdAt,
        },
      ];
      await this.esService.createByBulk(ES_INDEX_USER, record);
      await this.shopService.create({ userID, shopName: user.username });
    } catch (err) {
      console.log('user create:', err);
    }
  }
  async updateOnES(user: any) {
    try {
      const now = new Date();
      user.updatedAt = now.toISOString();
      const userOnES = await this.getUserOnES(user.id);
      await this.esService.update(ES_INDEX_USER, userOnES);
    } catch (error) {
      if (error.meta?.statusCode == 404) {
        this.createOnES(user);
      }
    }
  }

  async getUserOnES(userID: string) {
    const {
      body: {
        hits: { total, hits },
      },
    } = await this.esService.findBySingleField(ES_INDEX_USER, { userID });
    const count = total.value;
    if (count) {
      return { ...hits[0]._source, id: hits[0].id };
    }
    return;
  }

  public async save(user): Promise<User> {
    return await this.userRepository.save(user);
  }

  public async findOne(where: object): Promise<User> {
    return await this.userRepository.findOne({
      where,
    });
  }

  public async findById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return user;
  }

  public async getUniqueUserName(keyword: string): Promise<string> {
    let username = await keyword.toLowerCase().replace(' ', '');
    let count = 0;
    let checkUsername = username;
    while (count < 100) {
      const user = await this.findByUsername(checkUsername);
      if (!user) {
        return checkUsername;
      }
      checkUsername = username + Math.floor(Math.random() * 1000);
      count++;
    }
    return Math.random().toString(36).substring(8);
  }

  public async create(userDto: any): Promise<IUsers> {
    try {
      const user = await this.userRepository.save(userDto);

      await this.createOnES(user);
      return user;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  public async saveByField(id: number, fields: {}): Promise<User> {
    const user = {
      id,
      ...fields,
    };
    return await this.userRepository.save(user);
  }

  public async updateByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
      });

      user.password = bcrypt.hashSync(Math.random().toString(36).slice(-8), 8);
      return await this.userRepository.save(user);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateByPassword(id: number, password: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });
      user.password = bcrypt.hashSync(password, 8);

      return await this.userRepository.save(user);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateProfileUser(id: number, userProfileDto: UserProfileDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      user.name = userProfileDto.name;
      const userID = id.toString();
      if (userProfileDto.email !== user.email) {
        const email = userProfileDto.email;
        const existing = await this.userRepository.findOne({
          where: {
            email,
            id: Not(id),
          },
        });
        if (existing) {
          return {
            message: 'Email is existing',
            status: 404,
          };
        }
        user.email = email;
      }

      if (userProfileDto.phone !== user.phone) {
        const phone = this.getSlug(userProfileDto.phone);
        const existing = await this.userRepository.findOne({
          where: {
            phone,
            id: Not(id),
          },
        });
        if (existing) {
          return {
            message: 'Phone is existing.',
            statusCode: 404,
          };
        }
        user.phone = userProfileDto.phone;
      }

      if (userProfileDto.username !== user.username) {
        const username = this.getSlug(userProfileDto.username);
        const existing = await this.userRepository.findOne({
          where: {
            username,
            id: Not(id),
          },
        });
        if (existing) {
          return {
            message: 'Username is existing.',
            statusCode: 404,
          };
        }
        user.username = userProfileDto.username;
      }

      if (userProfileDto.shopName) {
        const shopName = this.getSlug(userProfileDto.shopName);

        const existing = await this.shopService.checkShopName(userID, shopName);
        if (existing) {
          return {
            message: 'shop name is existing',
            statusCode: 404,
          };
        }
        await this.shopService.updateByUser({ userID, shopName });
      }
      const userUpdated = await this.userRepository.save(user);
      await this.updateOnES(userUpdated);
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public getSlug(path: string) {
    if (path === undefined) return;
    path = path
      .replace(/^\/|\/$/g, '')
      .trim()
      .replace(/[&\/\\#”“!@$`’;,+()$~%.'':*^?<>{}]/g, '')
      .replace(/ /g, '')
      .replace(/_/g, '')
      .replace(/-/g, '')
      .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      .replace(/đ/g, 'd')
      .replace(/’/g, '');
    return cleanTextUtils.strip.nonASCII(path);
  }
  async createIndex() {
    const existing = await this.esService.checkIndexExisting(ES_INDEX_USER);
    if (!existing) {
      this.esService.createIndex(ES_INDEX_USER, {
        mappings: {
          properties: { name: { type: 'text' }, createdAt: { type: 'date' } },
        },
      });
    }
  }
}
