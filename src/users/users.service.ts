import { Injectable, Param} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { AddWinLoseDTO } from './dto/users.dto'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private users: Repository<Users>,
    ) { }

    async findOneUsername(username: string): Promise<Users | undefined> {
        return await this.users.findOne({where: {username: username}})
    }

    async findOneEmail(email: string): Promise<Users | undefined> {
        return await this.users.findOne({where: {email: email}})
    }

    async addWin(user: AddWinLoseDTO): Promise<Users> {
		const theUser = await this.findOneUsername(user.username);

		if (!theUser)
			return;
        theUser.win = theUser.win + 1;

		return await this.users.save(theUser)
    }

    async addLose(user: AddWinLoseDTO): Promise<Users> {
        const theUser = await this.findOneUsername(user.username);

		if (!theUser)
			return;
        theUser.loose = theUser.loose + 1;

		return await this.users.save(theUser)
    }

    async create(user: Users): Promise<Users> {
        return await this.users.save(user);
    }
}