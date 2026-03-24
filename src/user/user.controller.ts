import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { IUser } from './user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('test')
  test() {
    return this.userService.test();
  }
  @Get()
  findAll(): IUser[] {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('fields') fields?: string,
  ): Partial<IUser> {
    return this.userService.findOne(id, fields);
  }
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateUserDto): IUser {
    return this.userService.create(dto);
  }
}
