import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

export class UserController {

     async create(req: Request, res: Response) {

        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        try {
            const existingUser = await userRepository.findOneBy({ email });

            if (existingUser) {
                return res.status(409).json({ message: "Usuário já existe!" });
            }

            const newUser = userRepository.create({ name, email, password, role });
            await userRepository.save(newUser);

            return res.status(201).json(newUser);
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
            const { id, role } = req.body;

            if (!id || !role) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios" });
            }

            const existingUser = await userRepository.findOne(id);

            if (!existingUser) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            existingUser.role = role;

            await userRepository.save(existingUser);

            return res.status(200).json(existingUser);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Falha ao atualizar usuário" });
        }
    }

    async deleteUser(req: Request, res: Response) {

        try {
            const { id } = req.body; 

            if (!id) {
                return res.status(400).json({ message: "ID do usuário é obrigatório" });
            }

            const existingUser = await userRepository.findOne(id);

            if (!existingUser) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            await userRepository.remove(existingUser); 

            return res.status(204); 
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Falha ao excluir usuário" });
        }
    }

}
