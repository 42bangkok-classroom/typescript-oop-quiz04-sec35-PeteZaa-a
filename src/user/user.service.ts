import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from './user.interface';
import * as fs from 'fs/promises';
import { join } from 'path';
import { createUserDto } from './dto/create-user.dto';


@Injectable()
export class UserService {
  test() {
    return [];
  }

  private readonly dataPath = join(process.cwd(), 'data/users.json');

  async findAll(): Promise<IUser[]> {
    const data = await fs.readFile(this.dataPath, 'utf8');
    if (!data) {
      return []
    }
    return JSON.parse(data) as IUser[];
  }

  async findOne(id: string, fields?: string): Promise<Partial<IUser>> {
    const data = await this.findAll();
    const findOne = data.find((e) => e.id === id);
    if (!findOne) {
      throw new NotFoundException('User not found');
    }
    if (!fields) {
      return findOne;
    }

    const fieldList = fields.split(',');
    const result = {};

    fieldList.forEach((f) => {
      if (findOne[f] !== undefined) {
        result[f] = findOne[f];
      }
    });
    return result;
  }

  async create(dto: createUserDto) {
    const data = await this.findAll();

    const newID = String(data.length + 1);
    const newUser = { id: newID, ...dto };

    data.push(newUser);
    const data2 = fs.writeFile(this.dataPath, JSON.stringify(data, null, 2));
    await data2;
    return newUser;
  }
}
