import {
  IsDateString,
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  Min,
  IsNotEmpty,
  IsMongoId,
} from "class-validator";
import { REQUEST_STATES_ENUM } from "../../utils/enums/requests.enum";

export class AddRequestDTO {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  object: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @IsNotEmpty()
  motivation: string;

  @IsEnum(REQUEST_STATES_ENUM)
  @IsOptional()
  state: (typeof REQUEST_STATES_ENUM)[number];

  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  userId: string;

  @IsDateString()
  @IsOptional()
  validationDate?: string;

  @IsString()
  @IsMongoId()
  @IsOptional()
  approvedBy?: string;

  @IsString()
  @IsMongoId()
  @IsOptional()
  rejectedBy?: string;
}

export class UpdateRequestDTO {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  object: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  quantity: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  motivation: string;

  @IsEnum(REQUEST_STATES_ENUM)
  @IsOptional()
  state: (typeof REQUEST_STATES_ENUM)[number];

  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  userId: string;

  @IsDateString()
  @IsOptional()
  validationDate?: string;

  @IsString()
  @IsMongoId()
  @IsOptional()
  approvedBy?: string;

  @IsString()
  @IsMongoId()
  @IsOptional()
  rejectedBy?: string;
}
