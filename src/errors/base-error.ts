import { HttpException } from '@nestjs/common';

interface Property {
  status: number;
  code: string;
  errors?: any[];
}

class BaseError extends HttpException {
  private httpCode: number;

  code: string;

  isCustom = true;

  constructor(message: string, properties?: Property) {
    super(
      {
        message,
        code: properties.code,
        errors: properties.errors,
      },
      properties.status,
    );

    this.message = message;
    this.httpCode = properties.status;
    this.code = properties.code;

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

export default BaseError;
