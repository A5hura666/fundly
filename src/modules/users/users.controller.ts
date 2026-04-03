import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { FastifyRequest } from 'fastify';
import { SetInterestsDto } from '../interests/dto/set-interests.dto';
import { UserRole } from './entities/user.entity';

@ApiTags('Utilisateurs')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Voir son profil' })
  @ApiResponse({ status: 200, description: 'Profil récupéré avec succès' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: FastifyRequest & { user: { sub: number } }) {
    return this.usersService.findOne(req.user.sub);
  }

  @ApiOperation({ summary: 'Mettre à jour son profil' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Profil mis à jour avec succès' })
  @UseGuards(JwtAuthGuard)
  @Put('profile')
  updateProfile(
    @Req() req: FastifyRequest & { user: { sub: number } },
    @Body() data: UpdateUserDto,
  ) {
    return this.usersService.update(req.user.sub, data);
  }

  @ApiOperation({ summary: 'Lister tous les utilisateurs (admin)' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs récupérée' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Supprimer un utilisateur (admin)' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Utilisateur supprimé' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @ApiOperation({ summary: 'Associer des intérêts à son profil' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Intérêts mis à jour avec succès' })
  @UseGuards(JwtAuthGuard)
  @Post('interests')
  setInterests(
    @Req() req: FastifyRequest & { user: { sub: number } },
    @Body() body: SetInterestsDto,
  ) {
    return this.usersService.setInterests(req.user.sub, body.interests);
  }

  @ApiOperation({ summary: "Voir ses centres d'intérêt" })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Intérêts récupérés avec succès' })
  @UseGuards(JwtAuthGuard)
  @Get('interests')
  getInterests(@Req() req: FastifyRequest & { user: { sub: number } }) {
    return this.usersService.getInterests(req.user.sub);
  }
}
