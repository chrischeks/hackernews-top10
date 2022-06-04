import { Module } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  controllers: [NewsController],
  providers: [NewsService, ApiService],
})
export class NewsModule {}
