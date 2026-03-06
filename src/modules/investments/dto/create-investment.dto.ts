import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInvestmentDto {
  @ApiProperty({
    example: 2,
    description: "Identifiant de l'investisseur (utilisateur)",
  })
  @IsInt()
  @Type(() => Number)
  investorId: number;

  @ApiProperty({
    example: 5,
    description: 'Identifiant du projet financé',
  })
  @IsInt()
  @Type(() => Number)
  projectId: number;

  @ApiProperty({
    example: 10000,
    description: 'Montant investi dans le projet',
  })
  @IsNumber()
  @Type(() => Number)
  amount: number;
}
