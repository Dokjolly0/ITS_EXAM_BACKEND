import { IsDateString, IsEmail, IsString, IsOptional, MinLength, IsNotEmpty, IsEnum } from "class-validator";
import { USER_ROLE_ENUM } from "../../utils/enums/user.enum";

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

  @IsOptional()
  @IsEnum(USER_ROLE_ENUM)
  @IsString()
  role?: (typeof USER_ROLE_ENUM)[number]; // Optional, defaults to "user"
}

export class LoginDTO {
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
