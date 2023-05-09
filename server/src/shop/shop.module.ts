/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
    imports: [],
    controllers: [ShopController],
    providers: [ShopService],
})
export class ShopModule {
    constructor(private shopService: ShopService) {
    }
    onModuleInit() {
        this.shopService.createIndex().then()
    }

}
