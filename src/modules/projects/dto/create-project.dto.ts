import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProjectDto {
  @ApiProperty({
    example: 'Plateforme de financement participatif écologique',
    description: 'Titre du projet',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Une plateforme permettant de financer des projets écologiques.',
    description: 'Description détaillée du projet',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 50000,
    description: 'Budget nécessaire pour réaliser le projet',
  })
  @IsNumber()
  @Type(() => Number)
  budget: number;

  @ApiProperty({
    example: 'Technologie',
    description: 'Catégorie du projet',
  })
  @IsString()
  category: string;

  @ApiProperty({
    example: 1,
    description: "Identifiant de l'utilisateur propriétaire du projet",
  })
  @IsInt()
  @Type(() => Number)
  ownerId: number;

  @ApiPropertyOptional({
    example: [1, 2],
    description: "Liste des identifiants des centres d'intérêt liés au projet",
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  interests?: number[];
}
