import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  IsArray,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    example: 'utilisateur@email.com',
    description: "Adresse email de l'utilisateur",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'motdepasse123',
    description: "Mot de passe de l'utilisateur",
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    example: 'Jean',
    description: "Prénom de l'utilisateur",
  })
  @IsOptional()
  @IsString()
  firstname?: string;

  @ApiPropertyOptional({
    example: 'Dupont',
    description: "Nom de l'utilisateur",
  })
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.INVESTOR,
    description: "Rôle de l'utilisateur",
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiPropertyOptional({
    example: [1, 2, 3],
    description: "Liste des identifiants des centres d'intérêt",
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  interests?: number[];
}
