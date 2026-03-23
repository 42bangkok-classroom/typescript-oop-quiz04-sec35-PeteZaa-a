import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/create-user.dto';
import type { IUser } from './user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('test')
  test() {
    return this.userService.test();
  }
  @Get('users')
  findAll() {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string, @Query('fields') fields?: string): Partial<IUser> {
    return this.userService.findOne(id, fields);
  }

  @Post()
  create(@Body() create: createUserDto): IUser {
    return this.userService.create(create);
  }
}
