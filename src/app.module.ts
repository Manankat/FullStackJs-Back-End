import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '51.210.8.156',
      port: 5432,
      username: 'postgres',
      password: 'azertyuiop',
      database: 'game',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    EventsModule,
    GamesModule,
  ],
  controllers: [AuthController],
  providers: [AppService],
})
export class AppModule {}
