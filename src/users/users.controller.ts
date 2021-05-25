import { Controller, Param, Get, UseGuards, Res, HttpStatus, Post, Body, Patch } from '@nestjs/common';
import { ApiBearerAuth, 
    ApiOkResponse, 
    ApiTags, 
    ApiNotFoundResponse, 
    ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard-jwt/jwt-auth.guard';
import { Response } from 'express';
import { UsersService } from './users.service'
import { GetUserError, GetUserSuccess} from './users.response'
import { AddWinLoseDTO } from './dto/users.dto'

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
        if (response) {
            response.password = undefined;
            response.id = undefined;
            return res.status(HttpStatus.OK).send(response);
		}
		return res.status(HttpStatus.BAD_REQUEST).send({statusCode: 400, message: "No account with this username"});
	}

    @Patch('/win')
    @UseGuards(JwtAuthGuard)
    @ApiTags('Users')
    @ApiOkResponse({type: GetUserSuccess, description: 'Success'})
    @ApiUnauthorizedResponse({type: GetUserError, description: 'Unauthorized'})
    @ApiNotFoundResponse({type: GetUserError, description: 'Not Found'})
    @ApiBearerAuth('JWT-auth')
	async addWin(@Body() body: AddWinLoseDTO, @Res() res: Response) {
        const response = await this.usersService.addWin(body)
        if (response) {
            response.password = undefined;
            response.id = undefined;
            return res.status(HttpStatus.OK).send(response);
		}
		return res.status(HttpStatus.BAD_REQUEST).send({statusCode: 400, message: "No account with this username"});
	}

    @Patch('/loose')
    @UseGuards(JwtAuthGuard)
    @ApiTags('Users')
    @ApiOkResponse({type: GetUserSuccess, description: 'Success'})
    @ApiUnauthorizedResponse({type: GetUserError, description: 'Unauthorized'})
    @ApiNotFoundResponse({type: GetUserError, description: 'Not Found'})
    @ApiBearerAuth('JWT-auth')
	async addLoose(@Body() body: AddWinLoseDTO, @Res() res: Response) {
        const response = await this.usersService.addLose(body);
        if (response) {
            response.password = undefined;
            response.id = undefined;
            return res.status(HttpStatus.OK).send(response);
		}
		return res.status(HttpStatus.BAD_REQUEST).send({statusCode: 400, message: "No account with this username"});
	}
}
