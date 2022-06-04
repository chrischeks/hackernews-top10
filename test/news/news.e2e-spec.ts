import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import axios from 'axios';
import { AppModule } from '@src/app.module';
import { newStories, storyDetails } from './utils';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('News', () => {
    it('should get top 10 most occurring words in the titles of the last 25 stories', async () => {
      jest
        .spyOn(axios, 'get')
        .mockImplementationOnce(() => Promise.resolve(newStories))
        .mockImplementation(() => Promise.resolve(storyDetails));

      const response = await request(app.getHttpServer())
        .get('/news/stories/top10-words-in-titles-of-last-25-stories')
        .expect(200);

      const result = response.body;
      for (const word of result.data) {
        expect(storyDetails.data.title.toLowerCase().includes(word)).toBe(true);
      }
    });
  });
});
