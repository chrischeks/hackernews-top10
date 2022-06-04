import { Global, Module } from '@nestjs/common';
import { ContextService } from './context.service';
import { ResponseService } from './response.service';

@Global()
@Module({
  providers: [ContextService, ResponseService],
  exports: [ContextService, ResponseService],
})
export class UtilsModule {}
