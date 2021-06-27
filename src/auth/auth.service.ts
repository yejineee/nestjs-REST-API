import { Injectable } from '@nestjs/common';

export interface Hello {
  [type: string]: string;
}

@Injectable()
export class AuthService {
  getHello(): string {
    return 'Hello World!';
  }
  setHello(): Hello {
    return {
      id: 'ajslkdf',
      name: 'yejin',
    };
  }
}
