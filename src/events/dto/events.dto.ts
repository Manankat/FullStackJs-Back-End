import { IsNotEmpty } from 'class-validator';

export class JoinGameDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  color: number;

  @IsNotEmpty()
  uuid: string;
}

export class MoveDTO {  
    @IsNotEmpty()
    uuid: string;

    @IsNotEmpty()
    gameState: any;
}

export class ReadyDTO {  
  @IsNotEmpty()
  uuid: string;

  @IsNotEmpty()
  player: string;
}