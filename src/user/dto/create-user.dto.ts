import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  //id!:string
  @IsString()
  @IsNotEmpty()
  firstName!: string;
  @IsString()
  @IsNotEmpty()
  lastName!: string;
  @IsString()
  @IsNotEmpty()
  email!: string;
  @IsString()
  @IsNotEmpty()
  username!: string;
}
