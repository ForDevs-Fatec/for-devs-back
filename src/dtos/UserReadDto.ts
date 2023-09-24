import { ERole } from "../enum/ERole"

export class UserReadDto {
    name: string
    email: string
    role: ERole
    id: string
}