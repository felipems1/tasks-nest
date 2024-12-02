import { ConflictException, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { hashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserDto): Promise<Partial<UserDto>> {
    const userAlreadyRegistered = await this.findByUserName(user.username);

    if (userAlreadyRegistered) {
      throw new ConflictException(
        `User '${user.username}' is already registered.`,
      );
    }

    const hashedPassword = hashSync(user.password, this.saltRounds);
    const dbUser = this.mapDtoToEntity(user, hashedPassword);

    const savedUser = await this.userRepository.save(dbUser);

    return this.mapEntityToPartialDto(savedUser);
  }

  async findByUserName(username: string): Promise<UserDto | null> {
    const userFound = await this.userRepository.findOne({
      where: { username },
    });

    if (!userFound) {
      return null;
    }

    return this.mapEntityToDto(userFound);
  }

  private mapDtoToEntity(userDto: UserDto, hashedPassword: string): UserEntity {
    return {
      id: userDto.id,
      username: userDto.username,
      passwordHash: hashedPassword,
    };
  }

  private mapEntityToDto(userEntity: UserEntity): UserDto {
    return {
      id: userEntity.id,
      username: userEntity.username,
      password: userEntity.passwordHash,
    };
  }

  private mapEntityToPartialDto(userEntity: UserEntity): Partial<UserDto> {
    return {
      id: userEntity.id,
      username: userEntity.username,
    };
  }
}
