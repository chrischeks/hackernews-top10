import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from '../logger/logger.module';
import { ApiService } from '../api/api.service';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { ContextService } from '../utils/context.service';
import { ResponseService } from '../utils/response.service';

describe('NewsController', () => {
  let spyService: NewsService;
  const mockTop10Words = [
    'start',
    'apple',
    'to',
    'hacker',
    'phone',
    'mobile',
    'sun',
    'eclipse',
    'cup',
    'end',
  ];

  beforeEach(async () => {
    const NewsServiceProvider = {
      provide: NewsService,
      useFactory: () => ({
        top10WordsInTitlesOfLast25Stories: jest.fn(() => mockTop10Words),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsController],
      providers: [
        NewsServiceProvider,
        ApiService,
        ContextService,
        ResponseService,
      ],
      imports: [LoggerModule],
    }).compile();

    spyService = module.get<NewsService>(NewsService);
  });

  describe('Get top 10 words', () => {
    it('should be call top10WordsInTitlesOfLast25Stories', () => {
      expect(spyService.top10WordsInTitlesOfLast25Stories).toBeDefined();
    });

    //  it('should be retrieve top 10 Words InTitlesOfLast25Stories', () => {
    //    controller.top10WordsInTitlesOfLast25Stories(Response);
    //    expect(controller).toBeDefined();
    //  });
  });
});
