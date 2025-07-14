import { IsDateString, IsEmail, IsString, IsOptional, MinLength, IsNotEmpty } from "class-validator";

export class AddUserDTO {
  // Requested fields
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  username: string;

  @MinLength(8)
  password: string;
}

export class LoginDTO {
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
