import { Controller, Get, Post, Patch, Delete, Param, UseGuards, Res, HttpStatus, Body } from '@nestjs/common';
import { GamesService } from './games.service';
import { Games } from './entities/game.entity';
import { GameDTO, GameStateDTO } from './dto/game.dto'
import { JwtAuthGuard } from '../guard-jwt/jwt-auth.guard';
import { ApiBearerAuth, 
    ApiCreatedResponse, 
    ApiTags, 
    ApiOkResponse, 
    ApiNotFoundResponse,
    ApiUnauthorizedResponse } from '@nestjs/swagger';
import { GameError } from './games.response'
import { Response } from 'express';

@Controller('games')
export class GamesController {
	constructor(private readonly gamesService: GamesService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiTags('Games')
    @ApiCreatedResponse({type: Games, description: 'Success'})
    @ApiUnauthorizedResponse({type: GameError, description: 'Unauthorized'})
    @ApiNotFoundResponse({type: GameError, description: 'Not Found'})
    @ApiBearerAuth('JWT-auth')
	async create(@Body() gameDTO: GameDTO, @Res() res: Response) {
		const response = await this.gamesService.create(gameDTO);
		if (response) {
			return res.status(HttpStatus.CREATED).send(response);
		}
		return res.status(HttpStatus.BAD_REQUEST).send({statusCode: 400, message: "An Error occured with the data provided"});
	}

	@Get(':uuid')
	@UseGuards(JwtAuthGuard)
	@ApiTags('Games')
	@ApiOkResponse({type: Games, description: 'Success'})
    @ApiUnauthorizedResponse({type: GameError, description: 'Unauthorized'})
    @ApiNotFoundResponse({type: GameError, description: 'Not Found'})
    @ApiBearerAuth('JWT-auth')
	async findOne(@Param('uuid') uuid: string, @Res() res: Response) {
		const response =  await this.gamesService.findOne(uuid);
		if (response) {
			return res.status(HttpStatus.OK).send(response);
		}
		return res.status(HttpStatus.BAD_REQUEST).send({statusCode: 400, message: "Can't find any game with this uuid"});
	}

	@Patch('/players/:uuid')
	@UseGuards(JwtAuthGuard)
	@ApiTags('Games')
	@ApiOkResponse({type: Games, description: 'Success'})
    @ApiUnauthorizedResponse({type: GameError, description: 'Unauthorized'})
    @ApiNotFoundResponse({type: GameError, description: 'Not Found'})
    @ApiBearerAuth('JWT-auth')
	async updatePlayers(@Param('uuid') uuid: string, @Body() updateGameDto: GameDTO, @Res() res: Response) {
		const response =  await this.gamesService.updatePlayers(uuid, updateGameDto);
		if (response) {
			return res.status(HttpStatus.OK).send(response);
		}
		return res.status(HttpStatus.BAD_REQUEST).send({statusCode: 400, message: "An Error occured with the data provided"});
	}

	@Patch('/state/:uuid')
	@UseGuards(JwtAuthGuard)
	@ApiTags('Games')
    @ApiBearerAuth('JWT-auth')
	async updateGameState(@Param('uuid') uuid: string, @Body() updateGameDto: GameStateDTO, @Res() res: Response) {
		const response = await this.gamesService.updateGameState(uuid, updateGameDto);
		if (response) {
			return res.status(HttpStatus.OK).send(response);
		}
		return res.status(HttpStatus.BAD_REQUEST).send({statusCode: 400, message: "An Error occured with the data provided"});
	}

	@Delete(':uuid')
	@UseGuards(JwtAuthGuard)
	@ApiTags('Games')
    @ApiBearerAuth('JWT-auth')
	async remove(@Param('uuid') uuid: string, @Res() res: Response) {
		const response = await this.gamesService.remove(uuid);
		if (response) {
			return res.status(HttpStatus.OK).send(response);
		}
		return res.status(HttpStatus.BAD_REQUEST).send({statusCode: 400, message: "Can't find any game with this uuid"});
	}
}
