import { Injectable, Param} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from './entities/game.entity';
import { GameDTO, GameStateDTO } from './dto/game.dto'
import { v4 as uuidv4 } from 'uuid';
import {default as baseState} from "../baseGameState.json"
import { UsersService } from "../users/users.service"

@Injectable()
export class GamesService {
	constructor(
		@InjectRepository(Games)
		private games: Repository<Games>,
    	private usersService: UsersService,
	) { }

	async create(gameDTO: GameDTO) {
		var gameEntity = new Games();
		const user = await this.usersService.findOneUsername(gameDTO.username)

		gameEntity.uuid = uuidv4();

		gameEntity.players = ["","","","","",""];
		gameEntity.players[gameDTO.color - 1] = user.username;

		gameEntity.remainingColor = [1, 2, 3, 4, 5, 6];
		gameEntity.remainingColor[gameDTO.color - 1] = 0;

		gameEntity.gameState = JSON.stringify(baseState);

		return await this.games.save(gameEntity);
	}

	async findOne(uuid: string) {
		return await this.games.findOne({where: {uuid: uuid}});
	}

	async updatePlayers(uuid: string, updateGameDto: GameDTO) {
		const theGame = await this.findOne(uuid);
		const user = await this.usersService.findOneUsername(updateGameDto.username)

		if (!user || !theGame || (updateGameDto.color < 1 || updateGameDto.color > 6))
			return;
		if (!theGame.players.indexOf(user.username))
			return;
		theGame.players[updateGameDto.color - 1] = user.username;

		if (theGame.remainingColor[updateGameDto.color - 1] === 0)
			return;
		theGame.remainingColor[updateGameDto.color - 1] = 0;

		return await this.games.save(theGame)
	}

	async updateGameState(uuid: string, updateGameDto: GameStateDTO) {
		const theGame = await this.findOne(uuid);

		if (!theGame)
			return;
		theGame.gameState = JSON.stringify(updateGameDto.gameState);

		return await this.games.save(theGame)
	}

	async remove(uuid: string) {
		const theGame = await this.findOne(uuid);

		if (!theGame)
			return;

		return await this.games.remove(theGame);
	}
}
