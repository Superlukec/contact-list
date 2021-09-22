import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dto';

@Controller('users')
export class UsersController {
  @Post()
  saveUser(@Body() createUserDto: CreateUserDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
