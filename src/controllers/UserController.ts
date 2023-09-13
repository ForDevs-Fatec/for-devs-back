import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from 'bcryptjs'
import { UserService } from "../services/UserService";
import { UserReadDto } from "../dtos/UserReadDto";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

export class UserController {


    async login(req: Request, res: Response) {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Dados de login incorretos ou incompletos" })
        }

        try {
            const userService = new UserService()
            const user = await userRepository.findOneBy({ email })

            if(!user){
                return res.status(400).json({ message: "Dados de login incorretos ou incompletos" })
            }

            const validateUser = await userService.DecodePassword(password, user.password)
            if(!validateUser) return res.status(400).json({message: "Dados de login incorretos ou incompletos"})

            let tokenDto = {
                id: user.id,
                name: user.name,
                role: user.role
            }
            const secret = process.env.TOKEN_SECRET as string
            const token = jwt.sign(tokenDto, secret, {expiresIn: '1h'})

            return res.status(200).json({token: token})

        } catch (error) {
            return res.status(400).json({ message: "Erro ao efetuar login" })
        }
    }

    async create(req: Request, res: Response) {

        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        try {
            const userService = new UserService()
            const existingUser = await userRepository.findOneBy({ email });

            if (existingUser) {
                return res.status(409).json({ message: "Usuário já existe!" });
            }

            const hashedPassword = await userService.EncodePassword(password)

            const newUser = userRepository.create({ name, email, password: hashedPassword, role });
            await userRepository.save(newUser)
            return res.status(201).json({
                id: newUser.id,
                name: newUser.name,
                role: newUser.role,
                email: newUser.email
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async ListUser(req: Request, res: Response) {

        try {
            const users = await userRepository.find({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                },
            });

            return res.status(200).json(users);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Falha ao buscar usuário" });
        }
    }

    async updateUser(req: Request, res: Response) {

        try {
            const { id } = req.params
            const { role, name } = req.body;

            if (!id || role == null) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios" });
            }

            const existingUser = await userRepository.findOneBy({ id });

            if (!existingUser) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            existingUser.role = role;
            existingUser.name = name ?? existingUser.name;

            await userRepository.save(existingUser);

            return res.status(200).json(existingUser);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Falha ao atualizar usuário" });
        }
    }

    async deleteUser(req: Request, res: Response) {

        try {
            const id = req.params.id;
            return res.status(200).json(await userRepository.delete(id));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Falha ao excluir usuário" });
        }
    }

}
