import { Controller, Request, Post, UseGuards, Res, HttpStatus, Body } from '@nestjs/common';
import { ApiBearerAuth, 
    ApiOkResponse, 
    ApiCreatedResponse, 
    ApiTags, 
    ApiBadRequestResponse, 
    ApiNotFoundResponse,
    ApiUnauthorizedResponse,
    ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterCreated, RegisterError, LoginSuccess, LoginError} from "./auth.response"
import { RegisterParams, LoginParams } from "./auth.params"

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiTags('Authentification')
    @ApiCreatedResponse({ type: RegisterCreated, description: 'Success' })
    @ApiBadRequestResponse({ type: RegisterError, description: 'Bad Request' })
    @ApiNotFoundResponse({ type: RegisterError, description: 'Not Found' })
	@Post('register')
  	async register(@Body() registerBody: RegisterParams, @Res() res: Response) {
		const response = await this.authService.register(registerBody);
		if (response) {
            response.password = undefined;
            response.id = undefined;
			return res.status(HttpStatus.CREATED).send(response);
		}
		return res.status(HttpStatus.BAD_REQUEST).send({statusCode: 400, message: "An account already exists with this Username and/or Email address"});
  	}

    @ApiTags('Authentification')
    @ApiOkResponse({ type: LoginSuccess, description: 'Success', })
    @ApiUnauthorizedResponse({ type: LoginError, description: 'Unauthorized' })
    @ApiNotFoundResponse({ type: LoginError, description: 'Not Found' })
    @UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Body() loginBody: LoginParams, @Res() res: Response) {
        const response = await this.authService.login(loginBody);
        return res.status(HttpStatus.CREATED).send(response);
	}

	/*@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req, @Res() res: Response) {
		return req.user;
	}*/
}
