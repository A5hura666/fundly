import { Module } from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { InvestmentsController } from './investments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investment } from './entities/investment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Investment])],
  controllers: [InvestmentsController],
  providers: [InvestmentsService],
})
export class InvestmentsModule {}
