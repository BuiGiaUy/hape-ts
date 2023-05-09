/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './search.service';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: async () => ({
        node: proccess.env.ES_HOST,
      }),
    }),
  ],
  controllers: [SearchService],
  providers: [SearchService],
})
export class SearchModule {}
