import { Injectable } from '@nestjs/common';
import configuration from '../config/configuration';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class ApiService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = configuration().news.hackernews_baseurl;
  }

  async hackerNews(endpoint: string): Promise<AxiosResponse<any>> {
    const url = `${this.baseUrl}${endpoint}`;
    return axios.get(url, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
