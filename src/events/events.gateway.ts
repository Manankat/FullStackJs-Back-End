import {
	SubscribeMessage,
	WebSocketGateway,
	OnGatewayInit,
	WebSocketServer,
	MessageBody,
	ConnectedSocket,
	WsResponse
	} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { GamesService } from "../games/games.service"
import { GameDTO, GameStateDTO } from "../games/dto/game.dto"
import { JoinGameDTO, MoveDTO, ReadyDTO } from "./dto/events.dto"

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit {
	@WebSocketServer() server: Server;

	constructor(private readonly gamesService: GamesService) {}
	private logger: Logger = new Logger('EventsGateway');

	@SubscribeMessage('create-game')
	async createRoom(@MessageBody() data: GameDTO, @ConnectedSocket() socket: Socket): Promise<unknown> {
		const createdGame = await this.gamesService.create(data)

		socket.join(createdGame.uuid);
		socket.to(createdGame.uuid).emit('room-created', {data: createdGame});

		return { event: 'room-created', data: createdGame };
	}

	@SubscribeMessage('join-game')
	async joinRoom(@MessageBody() data: JoinGameDTO, @ConnectedSocket() socket: Socket): Promise<unknown> {
		const theGame = await this.gamesService.findOne(data.uuid);

		console.log("test")
		if (!theGame)
			return { event: 'join-game', error: "No Game for this uuid" };

		if(!this.gamesService.updatePlayers(data.uuid, {username: data.username, color: data.color}))
			return { event: 'join-game', error: "This player is alreay in the game, or color already taken by another player" };

		socket.join(theGame.uuid);
		socket.to(theGame.uuid).emit('join-game', {data: theGame});

		return { event: 'join-game', data: theGame };
	}

	@SubscribeMessage('leave-game')
	async leaveRoom(@MessageBody() data: JoinGameDTO, @ConnectedSocket() socket: Socket): Promise<unknown> {
		const theGame = await this.gamesService.findOne(data.uuid);

		if (!theGame)
			return { event: 'leave-game', error: "No Game for this uuid" };

		socket.to(data.uuid).emit('leave-game', {data: data});
		socket.leave(data.uuid);

		return { event: 'leave-game', data: data };
	}

    @SubscribeMessage('ready')
    async ready(@MessageBody() data: ReadyDTO, @ConnectedSocket() socket: Socket): Promise<unknown> {
		socket.to(data.uuid).emit('ready', {data: data});

		return { event: 'ready', data: data };
    }

    @SubscribeMessage('player-move')
    async playerMove(@MessageBody() data: MoveDTO, @ConnectedSocket() socket: Socket): Promise<unknown> {
		
		// Game Logic to implement HERE

		const gameUpdated = await this.gamesService.updateGameState(data.uuid , data.gameState)

		socket.to(gameUpdated.uuid).emit('player-move', {data: data});

		return { event: 'player-move', data: gameUpdated };
    }


	afterInit(server: Server) {
		this.logger.log('Init');
	}
}