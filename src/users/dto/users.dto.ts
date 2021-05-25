import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddWinLoseDTO {
  @IsNotEmpty()
  @ApiProperty()
  username: string;
}
  