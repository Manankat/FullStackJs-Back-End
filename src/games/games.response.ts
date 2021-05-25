import { ApiProperty } from '@nestjs/swagger';

export class GameError {
    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;
}