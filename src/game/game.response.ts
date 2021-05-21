import { ApiProperty } from '@nestjs/swagger';

export class RegisterError {
    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;
}

export class RegisterCreated {
    @ApiProperty()
    username: string;
    
    @ApiProperty()
    email: string;
}
