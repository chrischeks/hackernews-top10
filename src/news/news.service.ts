import { Inject, Injectable } from '@nestjs/common';
import { Logger } from '../logger';
import { ApiService } from '../api/api.service';
import { LOGGER } from '../logger/constants';
import { ItemResponse } from './types';
import { AxiosResponse } from 'axios';

@Injectable()
export class NewsService {
  constructor(
    private apiService: ApiService,
    @Inject(LOGGER)
    private logger: Logger,
  ) {}

  async top10WordsInTitlesOfLast25Stories(): Promise<string[]> {
    this.logger.info(
      'Start fetching top 10 most occurring words in the titles of the last 25 stories',
    );
    const top10 = 10;
    try {
      const response = await this.apiService.hackerNews(
        '/newstories.json?print=pretty',
      );

      const newStoriesIds = response.data as unknown as number[];

      const requests = newStoriesIds
        .slice(0, 25)
        .map((id: number) =>
          this.apiService.hackerNews(`/item/${id}.json?print=pretty`),
        );

      const newStories: AxiosResponse<ItemResponse>[] = await Promise.all(
        requests,
      );

      this.logger.info('Done fetching new stories');

      const titles: string[] = [];

      for (const story of newStories) {
        const storyTitle = story.data?.title;
        if (storyTitle) {
          titles.push(storyTitle.replace(/[^a-zA-Z ]/g, ''));
        }
      }

      this.logger.info('Done getting story titles');

      const wordCount = {};
      for (const word of titles.join(' ').split(' ')) {
        const lowercaseWord = word.toLowerCase();
        if (lowercaseWord) {
          wordCount[lowercaseWord]
            ? wordCount[lowercaseWord]++
            : (wordCount[lowercaseWord] = 1);
        }
      }

      this.logger.info('Done getting word count');

      const wordCountArray = Object.keys(wordCount).map((key) => [
        key,
        wordCount[key],
      ]);
      wordCountArray.sort((a, b) => b[1] - a[1]);

      const top10Words: string[] = wordCountArray
        .slice(0, top10)
        .map((item) => item[0]);

      this.logger.info(
        'Finished fetching top 10 most occurring words in the titles of the last 25 stories',
      );

      return top10Words;
    } catch (error) {
      throw error;
    }
  }

  // async top10WordsInTitlesOfLastWeekPosts() {
  //     const response = await this.apiService.hackerNews('/newstories.json?print=pretty');

  // }

  // async top10WordsInTitlesOfLast600StoriesOfUsers() {}
}
