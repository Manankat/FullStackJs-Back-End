import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    admin: number;
    
    @Column("int", { array: true })
    @ApiProperty()
    users: number[];
    
    @Column()
    @ApiProperty()
    state: string;
}