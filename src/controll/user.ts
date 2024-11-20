import { Request, Response } from "express";
import prisma from "../prisma";

export default class controladorEventos {
    async create(req: Request, res: Response): Promise<any> {
        const { nome, idade, email, senha } = req.body

        if (!nome || !idade || !email || !senha) {
            return res.status(400).json({
                menssgem: "Todos os campos são obrigatórios."
            })
        }

        if (idade < 18) {
            return res.status(403).json({
                mensagem: 'Você precisa ter no mínimo 18 anos.'
            })
        }

        try {

            const usuarios = await prisma.usuario.create({
                data: {
                    nome,
                    idade,
                    email,
                    senha
                }
            })

            if (usuarios) {
                return res.status(201).json({
                    mensagem: 'Cadastro do usuários criado com sucesso.'
                })
            }

            return res.status(202).json(usuarios)
        } catch (error) {
            const erro = error as Error;
            return res.status(500).json({
                mensagem: 'Algo deu errado no servidor.'
            })
        }

    }
}
