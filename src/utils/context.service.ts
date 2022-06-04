import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class ContextService {
  private context: Record<string, unknown> = {};

  set(key: string, value: any): void {
    this.context[key] = value;
  }

  get(key: string): any {
    return this.context[key];
  }
}
