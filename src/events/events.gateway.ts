import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';


@WebSocketGateway()
export class EventsGateway implements OnGatewayInit {

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventsGateway');

  @SubscribeMessage('moveRequest')
  MoveRequest(client, data): void {
    this.logger.log("it workds fucker"); 
    this.server.emit("MOVE");
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }
}

// @WebSocketGateway()
// export class EventsGateway {
//   @WebSocketServer()
//   server: Server;

//   @SubscribeMessage('events')
//   findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
//     return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
//   }

//   @SubscribeMessage('identity')
//   async identity(@MessageBody() data: number): Promise<number> {
//     return data;
//   }
// }