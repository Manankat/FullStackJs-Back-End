import { ApiProperty } from '@nestjs/swagger';

export class RegisterParams {
    @ApiProperty()
    username: string;
    
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}

export class LoginParams {
    @ApiProperty()
    username: string;
    
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}

