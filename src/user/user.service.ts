import { ConflictException, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { hashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserDto) {
    const userAlreadyRegistered = await this.findByUserName(user.username);

    if (userAlreadyRegistered) {
      throw new ConflictException(`User '${user.username}' already registered`);
    }

    const dbUser = new UserEntity();
    dbUser.username = user.username;
    dbUser.passwordHash = hashSync(user.password, 10);

    const { id, username } = await this.userRepository.save(dbUser);

    return {
      id,
      username,
    };
  }

  async findByUserName(username: string): Promise<UserDto | null> {
    const userFound = await this.userRepository.findOne({
      where: { username },
    });

    if (!userFound) {
      return null;
    }

    return {
      id: userFound.id,
      password: userFound.passwordHash,
      username: userFound.username,
    };
  }
}
