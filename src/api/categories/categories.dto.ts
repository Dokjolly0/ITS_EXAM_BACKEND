// categories.dto.ts
import { IsString, IsNotEmpty } from "class-validator";

export class AddOrUpdateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  description: string;
}
