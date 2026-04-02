import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { FastifyRequest } from 'fastify';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Projets')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Créer un projet (entrepreneur)' })
  @ApiResponse({ status: 201, description: 'Projet créé avec succès' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('entrepreneur')
  @Post()
  create(
    @Req() req: FastifyRequest & { user: { sub: number } },
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.create(req.user.sub, createProjectDto);
  }

  @ApiOperation({ summary: 'Lister tous les projets' })
  @ApiResponse({ status: 200, description: 'Liste des projets récupérée' })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @ApiOperation({ summary: 'Consulter un projet par ID' })
  @ApiResponse({ status: 200, description: 'Projet récupéré avec succès' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Mettre à jour un projet (entrepreneur propriétaire)',
  })
  @ApiResponse({ status: 200, description: 'Projet mis à jour avec succès' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('entrepreneur')
  @Patch(':id')
  update(
    @Req() req: FastifyRequest & { user: { sub: number } },
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(req.user.sub, id, updateProjectDto);
  }

  @ApiOperation({
    summary: 'Supprimer un projet (entrepreneur propriétaire ou admin)',
  })
  @ApiResponse({ status: 200, description: 'Projet supprimé avec succès' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('entrepreneur', 'admin')
  @Delete(':id')
  remove(
    @Req() req: FastifyRequest & { user: { sub: number; role: UserRole } },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.projectsService.remove(req.user.sub, req.user.role, id);
  }
}
