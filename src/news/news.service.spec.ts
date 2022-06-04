import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { NewsService } from './news.service';
import { newStories, storyDetails } from '../../test/utils';
import { AppModule } from '../app.module';

describe('NewsService', () => {
  let newsService: NewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    newsService = module.get<NewsService>(NewsService);
  });

  describe('NewsService', () => {
    it('NewsService - should be defined', () => {
      expect(newsService).toBeDefined();
    });

    it('should get top 10 most occurring words in the titles of the last 25 stories', async () => {
      jest
        .spyOn(axios, 'get')
        .mockImplementationOnce(() => Promise.resolve(newStories))
        .mockImplementation(() => Promise.resolve(storyDetails));

      const top10WordsInTitlesOfLast25Stories =
        await newsService.top10WordsInTitlesOfLast25Stories();
      for (const word of top10WordsInTitlesOfLast25Stories) {
        expect(storyDetails.data.title.toLowerCase().includes(word)).toBe(true);
      }
    });
  });
});
