import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  userId: number;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
