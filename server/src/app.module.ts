import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import { ShopModule } from './shop/shop.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ProductsModule,
    AuthModule,
    SearchModule,
    ShopModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
