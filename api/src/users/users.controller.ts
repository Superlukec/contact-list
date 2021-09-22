import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll(@Req() request: Request): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): string {
    return `Item ${id}`;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): string {
    return `Name: ${createUserDto.name}`;
  }

  @Delete(':id')
  deleteItem(@Param('id') id): string {
    return `Delete item ${id}`;
  }

  @Put(':id')
  updateItem(@Body() updateUserDto: CreateUserDto, @Param('id') id): string {
    return `Update item ${id} - Name ${updateUserDto.name}`;
  }
}
