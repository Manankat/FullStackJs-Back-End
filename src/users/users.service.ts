import { Injectable, Param} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';


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

    async create(user: Users): Promise<Users> {
        return await this.users.save(user);
    }
}