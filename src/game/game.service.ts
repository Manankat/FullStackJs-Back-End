import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { Game } from './game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
	constructor(
    	@InjectRepository(Game)
        private games: Repository<Game>,
  	) {}

  	async createGame(admin: any): Promise<any> {
          console.log(admin.id)
          var game = new Game();
          game.admin = admin.id;
          game.users = [admin.id];
          game.state = "initalState";
	    return await this.games.save(game);
	}
}