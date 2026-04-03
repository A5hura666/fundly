import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { FastifyRequest } from 'fastify';

@ApiTags('Investissements')
@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @ApiOperation({ summary: 'Investir dans un projet (investisseur)' })
  @ApiResponse({ status: 201, description: 'Investissement créé avec succès' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INVESTOR, UserRole.ADMIN)
  @Post()
  create(
    @Req() req: FastifyRequest & { user: { sub: number } },
    @Body() createInvestmentDto: CreateInvestmentDto,
  ) {
    return this.investmentsService.create(req.user.sub, createInvestmentDto);
  }

  @ApiOperation({ summary: 'Voir ses investissements (investisseur)' })
  @ApiResponse({
    status: 200,
    description: 'Liste des investissements récupérée',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INVESTOR, UserRole.ADMIN)
  @Get()
  findMyInvestments(@Req() req: FastifyRequest & { user: { sub: number } }) {
    return this.investmentsService.findByInvestor(req.user.sub);
  }

  @ApiOperation({ summary: "Voir les investissements d'un projet" })
  @ApiResponse({
    status: 200,
    description: 'Investissements du projet récupérés',
  })
  @UseGuards(JwtAuthGuard)
  @Get('project/:id')
  findByProject(@Param('id', ParseIntPipe) id: number) {
    return this.investmentsService.findByProject(id);
  }

  @ApiOperation({ summary: 'Annuler un investissement (investisseur)' })
  @ApiResponse({
    status: 200,
    description: 'Investissement annulé avec succès',
  })
  @ApiResponse({ status: 403, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Investissement non trouvé' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INVESTOR, UserRole.ADMIN)
  @Delete(':id')
  remove(
    @Req() req: FastifyRequest & { user: { sub: number; role: UserRole } },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.investmentsService.remove(req.user.sub, req.user.role, id);
  }
}
