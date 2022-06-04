import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ApiProperty } from '@nestjs/swagger';
import { get } from 'lodash';
import BaseError from '../errors/base-error';

export class ResponseObject<T> {
  @ApiProperty({
    description: 'Error Code',
  })
  code?: string;

  @ApiProperty({
    description: 'Response Message',
  })
  message?: string;

  data?: T;
}

@Injectable()
export class ResponseService {
  json<T>(
    res: Response,
    statusOrError: number | Error,
    message?: string,
    data?: Record<string, unknown> | Array<Record<string, unknown>> | T,
  ): void {
    const error = statusOrError instanceof Error ? statusOrError : null;

    const responseObj: ResponseObject<typeof data> = {};
    responseObj.message = message;

    let status = statusOrError;

    if (error) {
      const errorObj = statusOrError as Error;
      responseObj.message = errorObj.message;
      status = get(errorObj, 'status', 400);
    }

    if (data) {
      responseObj.data = data;
    }

    if (error && false === error instanceof BaseError) {
      responseObj.message = 'Something went wrong';
    }

    const statusCode = status as number;
    res.status(statusCode).json(responseObj);
  }
}
