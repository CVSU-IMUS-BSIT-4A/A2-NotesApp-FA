import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  @IsOptional()
  isArchived?: boolean;
}
