import { IsNotEmpty, IsEmail } from "class-validator";

export class UserAuthenticateDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
