import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Games } from './entities/game.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Games]),
  ],
  providers: [GamesService],
  exports: [GamesService],
  controllers: [GamesController],
})
export class GamesModule {}
