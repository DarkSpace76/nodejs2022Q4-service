import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getWriteMain(inp: string): string {
    return inp;
  }
}
