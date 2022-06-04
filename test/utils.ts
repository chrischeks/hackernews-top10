import { ItemResponse } from '../src/news/types';
import { AxiosResponse } from 'axios';
import { range } from 'lodash';

const axiosOptions = {
  config: {},
  status: 200,
  statusText: 'ok',
  headers: {},
};

export const newStories: AxiosResponse = { data: range(30), ...axiosOptions };

export const storyDetails: AxiosResponse<Partial<ItemResponse>> = {
  data: {
    by: 'adam_ellsworth',
    descendants: 0,
    id: 31618113,
    score: 1,
    text: 'I started my job search about 8 months ago, and while I&#x27;ve had a few interviews, I feel like my CV is hindering my prospects.<p>Ty.',
    time: 1654330540,
    title: 'Ask HN: What sites are there which can help me refine my CV?',
    type: 'story',
  },
  ...axiosOptions,
};
