import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';
import { Response } from 'express';

@Injectable()
export class AuthService {
	constructor(
    	private usersService: UsersService,
    	private jwtService: JwtService
  	) {}

  	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.usersService.findOneUsername(username);
		pass = createHash('sha256').update(pass).digest('hex');
		if (user && user.password === pass) {
			const { password, ...result } = user;
			return result;
		}
	    return null;
	}

  	async login(user: any) {
		const payload = { username: user.username, sub: user.userId };
		return {
			access_token: this.jwtService.sign(payload),
    	};
  	}

	async register(user: any) {
		if (await this.usersService.findOneEmail(user.email) === undefined
		&& await this.usersService.findOneUsername(user.username) === undefined) {
			user.password = createHash('sha256').update(user.password).digest('hex');
			await this.usersService.create(user);
			return user;
		}
		return ;
	}
}