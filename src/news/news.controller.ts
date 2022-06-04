import { Controller, Get, Inject, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { Logger } from 'winston';
import { LOGGER } from '../logger/constants';
import { REQUEST_ID } from '../utils/constants';
import { ContextService } from '../utils/context.service';
import { ResponseService } from '../utils/response.service';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  private logger: Logger;

  constructor(
    @Inject(LOGGER) logger: Logger,
    private newsService: NewsService,
    private contextService: ContextService,
    private responseService: ResponseService,
  ) {
    this.logger = logger.child({
      context: { service: 'NewsController', module: 'News' },
      [REQUEST_ID]: this.contextService.get(REQUEST_ID),
    });
  }

  @ApiOperation({
    summary: 'Fetch top 10 words in the titles of the last 25 stories',
  })
  @ApiResponse({
    status: 200,
    description: 'Customer created',
  })
  @Get('/stories/top10-words-in-titles-of-last-25-stories')
  async top10WordsInTitlesOfLast25Stories(@Res() res: Response): Promise<void> {
    try {
      const data = await this.newsService.top10WordsInTitlesOfLast25Stories();
      return this.responseService.json(
        res,
        200,
        'Top 10 words retrieved successfully ',
        data,
      );
    } catch (error) {
      this.logger.error(`issue logging into account: ${error.message}`);
      return this.responseService.json(res, error);
    }
  }
}
