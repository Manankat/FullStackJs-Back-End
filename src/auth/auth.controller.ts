import { Controller, Request, Post, UseGuards, Res, HttpStatus, Body } from '@nestjs/common';
import { ApiOkResponse, 
    ApiCreatedResponse, 
    ApiTags, 
    ApiBadRequestResponse, 
    ApiNotFoundResponse,
    ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LocalAuthGuard } from '../guard-jwt/local-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterCreated, RegisterError, LoginSuccess, LoginError} from "./auth.response"
import { RegisterParams, LoginParams } from "./auth.params"

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

	@Post('register')
    @ApiTags('Authentification')
    @ApiCreatedResponse({type: RegisterCreated, description: 'Success'})
    @ApiBadRequestResponse({type: RegisterError, description: 'Bad Request'})
    @ApiNotFoundResponse({type: RegisterError, description: 'Not Found'})
  	async register(@Body() registerBody: RegisterParams, @Res() res: Response) {
		const response = await this.authService.register(registerBody);
		if (response) {
            response.password = undefined;
            response.id = undefined;
			return res.status(HttpStatus.CREATED).send(response);
		}
		return res.status(HttpStatus.BAD_REQUEST).send({statusCode: 400, message: "An account already exists with this Username and/or Email address"});
  	}

    @Post('login')
    @ApiTags('Authentification')
    @ApiOkResponse({type: LoginSuccess, description: 'Success'})
    @ApiUnauthorizedResponse({type: LoginError, description: 'Unauthorized'})
    @ApiNotFoundResponse({type: LoginError, description: 'Not Found'})
    @UseGuards(LocalAuthGuard)
	async login(@Body() loginBody: LoginParams, @Res() res: Response) {
        const response = await this.authService.login(loginBody);
        return res.status(HttpStatus.CREATED).send(response);
	}
}
