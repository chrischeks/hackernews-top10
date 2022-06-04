import { Global, Module } from '@nestjs/common';
import { LOGGER } from './constants';

import { factory } from './logger.service';

@Global()
@Module({
  providers: [{ provide: LOGGER, useFactory: factory }],
  exports: [LOGGER],
})
export class LoggerModule {}
