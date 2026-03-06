import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateInterestDto {
  @ApiProperty({
    example: 'Technologie',
    description: "Nom du centre d'intérêt",
  })
  @IsString()
  @Length(2, 100)
  name: string;
}
