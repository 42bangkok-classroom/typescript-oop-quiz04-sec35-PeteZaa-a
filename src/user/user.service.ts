import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.interface';
import * as fs from 'fs';
import { join } from 'path';
import { createUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  test() {
    return [];
  }

  private readonly dataPath = join(process.cwd(), 'data', 'users.json');

  findAll(): IUser[] {
    const data = fs.readFileSync(this.dataPath, 'utf8');
    if (!data) {
      return [];
    }
    return JSON.parse(data) as IUser[];
  }

  findOne(id: string, fields?: string): Partial<IUser> {
    const data = this.findAll();
    const findOne = data.find((e) => e.id === id);
    if (!findOne) {
      throw new NotFoundException('User not found');
    }
    if (!fields) {
      return findOne;
    }

    const fieldList = fields.split(',');
    const result: Partial<IUser> = {};

    fieldList.forEach((field) => {
      if (findOne[field as keyof IUser] !== undefined) {
        result[field as keyof IUser] = findOne[field as keyof IUser];
      }
    });
    return result;
  }

  create(dto: createUserDto) {
    const data = this.findAll();

    const newID = String(data.length + 1);
    const newUser = { id: newID, ...dto };

    data.push(newUser);
    fs.writeFileSync(this.dataPath, JSON.stringify(data, null, 2), 'utf8');
    return newUser;
  }
}
