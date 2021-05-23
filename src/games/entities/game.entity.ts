import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Games {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    uuid: string;
    
    @Column("text", { array: true })
    @ApiProperty()
    players: string[];
    
    @Column()
    @ApiProperty()
    gameState: string;

    @Column("int", { array: true })
    @ApiProperty()
    remainingColor: number[];
}