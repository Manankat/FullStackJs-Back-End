import { Controller, Request, Post, UseGuards, Res, HttpStatus, Body } from '@nestjs/common';
import { ApiBearerAuth, 
    ApiOkResponse, 
    ApiCreatedResponse, 
    ApiTags, 
    ApiBadRequestResponse, 
    ApiNotFoundResponse,
    ApiUnauthorizedResponse,
    ApiParam } from '@nestjs/swagger';
import { GameService } from './game.service';
import { Response } from 'express';
import { RegisterCreated, RegisterError} from "./game.response"
import { CreateParams } from "./game.params"

@Controller('game')
export class GameController {
    constructor(private gameService: GameService) {}

    @ApiTags('Games')
    @ApiCreatedResponse({ type: RegisterCreated, description: 'Success' })
    @ApiBadRequestResponse({ type: RegisterError, description: 'Bad Request' })
    @ApiNotFoundResponse({ type: RegisterError, description: 'Not Found' })
	@Post('create')
  	async register(@Body() createBody: CreateParams, @Res() res: Response) {
		const response = await this.gameService.createGame(createBody);
		if (response) {
            console.log(response);
			return res.status(HttpStatus.CREATED).send(response);
		}
		return res.status(HttpStatus.BAD_REQUEST).send({statusCode: 400, message: "Cannot create account"});
  	}
}
