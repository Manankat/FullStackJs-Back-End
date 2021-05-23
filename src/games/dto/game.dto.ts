import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GameDTO {
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  color: number;
}

export class GameStateDTO {
  @IsNotEmpty()
  @ApiProperty()
  gameState: any;
}