import { Injectable } from '@nestjs/common';
import { User } from './interfaces/users.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: '123',
      name: '123',
    },
    {
      id: '123',
      name: '123',
    },
  ];

  findAll(): User[] {
    return this.users;
  }
}
