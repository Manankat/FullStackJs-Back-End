import { ApiProperty } from '@nestjs/swagger';

export class GetUserError {
    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;
}

export class GetUserSuccess {
    @ApiProperty()
    id: number;

    @ApiProperty()
    username: string;
    
    @ApiProperty()
    email: string;
}