import {
  Controller,
  Get,
  // Post,
  // Body,
  // Param,
  // Delete,
  // ParseIntPipe,
  // Put,
} from '@nestjs/common';
import { InterestsService } from './interests.service';
// import { CreateInterestDto } from './dto/create-interest.dto';
// import { UpdateInterestDto } from './dto/update-interest.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Intérêts')
@Controller('interests')
export class InterestsController {
  constructor(private readonly interestsService: InterestsService) {}

  // @ApiOperation({ summary: "Créer un centre d'intérêt" })
  // @ApiResponse({
  //   status: 201,
  //   description: "Centre d'intérêt créé avec succès",
  // })
  // @Post()
  // create(@Body() createInterestDto: CreateInterestDto) {
  //   return this.interestsService.create(createInterestDto);
  // }

  @ApiOperation({ summary: "Lister tous les centres d'intérêt disponibles" })
  @ApiResponse({ status: 200, description: 'Liste des intérêts récupérée' })
  @Get()
  findAll() {
    return this.interestsService.findAll();
  }

  // @ApiOperation({ summary: "Consulter un centre d'intérêt par ID" })
  // @ApiResponse({
  //   status: 200,
  //   description: "Centre d'intérêt récupéré avec succès",
  // })
  // @ApiResponse({ status: 404, description: "Centre d'intérêt non trouvé" })
  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.interestsService.findOne(id);
  // }

  // @ApiOperation({ summary: "Mettre à jour un centre d'intérêt" })
  // @ApiResponse({
  //   status: 200,
  //   description: "Centre d'intérêt mis à jour avec succès",
  // })
  // @ApiResponse({ status: 404, description: "Centre d'intérêt non trouvé" })
  // @Put(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateInterestDto: UpdateInterestDto,
  // ) {
  //   return this.interestsService.update(id, updateInterestDto);
  // }

  // @ApiOperation({ summary: "Supprimer un centre d'intérêt" })
  // @ApiResponse({
  //   status: 200,
  //   description: "Centre d'intérêt supprimé avec succès",
  // })
  // @ApiResponse({ status: 404, description: "Centre d'intérêt non trouvé" })
  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.interestsService.remove(+id);
  // }
}
