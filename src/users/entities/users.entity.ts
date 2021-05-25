import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

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

    @Column({nullable: false, default: 0})
    @ApiProperty()
    win: number;

    @Column({nullable: false, default: 0})
    @ApiProperty()
    loose: number;
}