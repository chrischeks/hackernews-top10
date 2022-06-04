import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { UtilsModule } from './utils/utils.module';
import { LoggerModule } from './logger/logger.module';
import { ApiService } from './api/api.service';

@Module({
  imports: [NewsModule, LoggerModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService, ApiService],
  exports: [ApiService],
})
export class AppModule {}
