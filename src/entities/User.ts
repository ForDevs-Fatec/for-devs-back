import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ERole } from "../enum/ERole";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: 'text'})
    name: string

    @Column({ type: 'text'})
    email: string

    @Column({ type: 'text'})
    password: string

    @Column({ type: 'int', default: 2})
    role: ERole

}

export type Users = Array<User>