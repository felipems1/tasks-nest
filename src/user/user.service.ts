import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  private users: UserDto[] = [];

  create(user: UserDto) {
    user.id = uuid();
    user.password = hashSync(user.password, 10);
    this.users.push(user);
  }
}
