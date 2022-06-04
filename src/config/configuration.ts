export interface Configuartion {
  env: string;
  news: {
    hackernews_baseurl: string;
  };
  logLevel: string;
  isTest(): boolean;
}

export default (): Configuartion => ({
  env: process.env.NODE_ENV,
  news: {
    hackernews_baseurl: ' https://hacker-news.firebaseio.com/v0',
  },
  logLevel: process.env.LOG_LEVEL || 'info',
  isTest(): boolean {
    return process.env.NODE_ENV === 'test';
  },
});
