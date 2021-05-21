import { ApiProperty } from '@nestjs/swagger';

export class CreateParams {
    @ApiProperty()
    admin: number;
}