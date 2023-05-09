import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  Users } from './users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ShopService } from 'src/shop/shop.service';
import { SearchModule } from 'src/search/search.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    SearchModule,
    AddressModule,
    ShopService,
  ],
  providers: [
    UsersService,
    CartService,
    ProductsService,
    FilesService,
    AddressService,
    ShopService,
    CategoriesService,
  ],
  controllers: [UsersController],
})
export class UsersModule {
  constructor(private usersService: UsersService) {}
  onModuleInit() {
    this.usersService.createIndex().then();
  }
}
