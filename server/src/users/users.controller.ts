import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { Users } from './users.entity';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { IUsers } from './interfaces/users.interface';
import { Put } from '@nestjs/common/decorators';
import { ShopService } from 'src/shop/shop.service';

@UseGuards(AuthGuard('jwt'))
@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cartService: CartService,
    private readonly shopService: ShopService,
  ) {}

  @Get('/profile')
  public async getUser(@Res() res): Promise<IUsers> {
    const userId = res.req.user.id;
    const user = await this.usersService.findById(userId);
    const carts = await this.cartService.getSummary(userId);
    const shop = await this.shopService.getByUserID(userId);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    delete user.password;
    return res.status(HttpStatus.OK).json({
      user: user,
      carts,
      shop,
      statusCode: 200,
    });
  }

  @Put('/profile')
  public async updateProfileUser(
    @Res() res,
    @Body() userProfileDto: UserProfileDto,
  ): Promise<any> {
    try {
      const userId = res.req.user.id;

      return res
        .status(HttpStatus.OK)
        .json(
          await this.usersService.updateProfileUser(userId, userProfileDto),
        );
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: User not updated!',
        statusCode: 400,
      });
    }
  }
}
