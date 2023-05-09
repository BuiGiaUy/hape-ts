/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { ShopService } from './shop.service';

@Controller()
export class ShopController {
    constructor(public readonly addressService: ShopService) {}   
}
