import { Controller, Get, Post, Body, Patch, UseGuards, Param, Delete } from '@nestjs/common';
import { GamesService } from './games.service';
import { Games } from './entities/game.entity';
import { GameDTO, GameStateDTO } from './dto/game.dto'
import { JwtAuthGuard } from '../guard-jwt/jwt-auth.guard';
import { ApiBearerAuth, 
  ApiOkResponse, 
  ApiTags, 
  ApiNotFoundResponse,
  ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('games')
export class GamesController {
	constructor(private readonly gamesService: GamesService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiTags('Games')
    @ApiBearerAuth('JWT-auth')
	async create(@Body() gameDTO: GameDTO) {
		return await this.gamesService.create(gameDTO);
	}

	@Get(':uuid')
	@UseGuards(JwtAuthGuard)
	@ApiTags('Games')
    @ApiBearerAuth('JWT-auth')
	async findOne(@Param('uuid') uuid: string) {
		return await this.gamesService.findOne(uuid);
	}

	@Patch('/players/:uuid')
	@UseGuards(JwtAuthGuard)
	@ApiTags('Games')
    @ApiBearerAuth('JWT-auth')
	async updatePlayers(@Param('uuid') uuid: string, @Body() updateGameDto: GameDTO) {
		return await this.gamesService.updatePlayers(uuid, updateGameDto);
	}

	@Patch('/state/:uuid')
	@UseGuards(JwtAuthGuard)
	@ApiTags('Games')
    @ApiBearerAuth('JWT-auth')
	async updateGameState(@Param('uuid') uuid: string, @Body() updateGameDto: GameStateDTO) {
		return await this.gamesService.updateGameState(uuid, updateGameDto);
	}

	@Delete(':uuid')
	@UseGuards(JwtAuthGuard)
	@ApiTags('Games')
    @ApiBearerAuth('JWT-auth')
	async remove(@Param('uuid') uuid: string) {
		return await this.gamesService.remove(uuid);
	}
}
