import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

export class UserController {

    async create(req: Request, res: Response){
        try {
            await userRepository.findOneBy({
                email: req.body.email

            })}catch (error) {
                console.log(error);
                return res.status(500).json({message: "Usuário já existe!"})
            }


        const { name, email, password, role} = req.body

        if (!name || !email || !password || !role){
            return res.status(400).json({message: "Todos os campos são obrigatórios"})
        }

        try{
            const newUser = userRepository.create({name, email, password, role})

            await userRepository.save(newUser)

            return res.status(201).json(newUser)

        }catch (error) {
            console.log(error);
            return res.status(500).json({message: "Internal Server Error"})
        }

    }

    async ListUser(req: Request, res: Response) {

        try {
            const users = await userRepository.find({
                select: {
                    name: true,
                    email: true,
                    role: true
                },
            })

            return res.status(201).json(users)

        } catch (error) {
            return res.status(400).json({ message: "Falha ao buscar usuário" })
        }
    }



}
