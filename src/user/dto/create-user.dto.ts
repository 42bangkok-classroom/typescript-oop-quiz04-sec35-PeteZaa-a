import { IsNotEmpty } from 'class-validator';

export class createUserDto {
  //id!:string
  @IsNotEmpty()
  firstName!: string;

  @IsNotEmpty()
  lastName!: string;

  email!: string;

  username!: string;
}
