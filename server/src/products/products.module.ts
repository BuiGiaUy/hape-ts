import { SearchModule } from 'src/search/search.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [SearchModule,],
  controllers: [ProductsController],
  providers: [ProductsService, FilesService, CategoryService],
})
export class ProductsModule {}
