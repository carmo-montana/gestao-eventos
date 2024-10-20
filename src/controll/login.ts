import { Request, Response } from "express"
import prisma from "../prisma"
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'

export default class verificacaoLogin {
    async criar(req: Request, res: Response): Promise<any> {
        const { email, senha } = req.body

        if (!email || !senha) {
            return res.status(404).json({
                erro: 'Todos os campos são obrigatórios.'
            })
        }
        try {

            const login = await prisma.usuario.findUnique({
                where: { email }
            })

            if (!login) {
                return res.status(404).json({
                    erro: 'E-amil ou senha inválidos.'
                })
            }

            const verificacaoSenha = bcrypt.compare(senha, login.senha)
            if (!verificacaoSenha) {
                return res.status(404).json({
                    erro: 'E-amil ou senha inválidos.'
                })
            }

            const token = Jwt.sign(
                { id: login.id },
                process.env.JWT_SECRET || '',
                { expiresIn: '1h' }
            )

            return res.status(201).json(token)
        } catch (error) {

        }
    }
}