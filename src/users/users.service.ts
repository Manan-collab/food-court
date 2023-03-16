import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { encodePassword } from '../utility/password';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepo: UsersRepository,
  ) {}

  async findByEmail(email: string) {
    try {
      const result = await this.usersRepo.read({ email: email });
      return result;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.usersRepo.read({ id: id });
      return result;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const password = encodePassword(createUserDto.password);
      const user = await this.usersRepo.create({ ...createUserDto, password });
      console.log(user);
      
      return new HttpException('USER CREATED', HttpStatus.CREATED);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.usersRepo.update(id, updateUserDto);
      return new HttpException('USER UPDATED', HttpStatus.ACCEPTED);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const result = await this.usersRepo.showAll();
      return result;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async remove(id: number) {
    try {
      const result = await this.usersRepo.remove(id);
      return new HttpException('USER REMOVED', HttpStatus.GONE);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
