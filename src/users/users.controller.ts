import { Controller, Param, Get, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, 
    ApiOkResponse, 
    ApiTags, 
    ApiNotFoundResponse,
    ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard-jwt/jwt-auth.guard';
import { Response } from 'express';
import { UsersService } from './users.service'
import {GetUserError, GetUserSuccess} from './users.response'

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    
	@Get(':username')
    @UseGuards(JwtAuthGuard)
    @ApiTags('Users')
    @ApiOkResponse({type: GetUserSuccess, description: 'Success'})
    @ApiUnauthorizedResponse({type: GetUserError, description: 'Unauthorized'})
    @ApiNotFoundResponse({type: GetUserError, description: 'Not Found'})
    @ApiBearerAuth('JWT-auth')
	async getProfile(@Param('username') username: string, @Res() res: Response) {
        const response = await this.usersService.findOneUsername(username);
		return res.status(HttpStatus.OK).send(response);
	}
}