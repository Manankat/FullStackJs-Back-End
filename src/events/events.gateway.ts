import {
    MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
  } from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { GamesService } from '../games/games.service';

@Injectable()
@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

	constructor(
		private gameService: GamesService
	) {}

	handleConnection() {
		console.log("Test")
	}

	handleDisconnect() {
		console.log("Test0")
	}

    @SubscribeMessage('create-game')
    async createGame(@MessageBody() data: string): Promise<string> {
		return data;
    }

    @SubscribeMessage('ready')
    async handleReady(@MessageBody() data: string): Promise<string> {
		console.log(data);
		return data;
    }

    @SubscribeMessage('move')
    async identity(@MessageBody() data: string): Promise<string> {
        return data;
    }
}