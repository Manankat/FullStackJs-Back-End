import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    username: string;
    
    @Column()
    @ApiProperty()
    email: string;
    
    @Column()
    @ApiProperty()
    password: string;
}