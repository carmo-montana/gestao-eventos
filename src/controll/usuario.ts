import e, { Request, Response } from "express"
import prisma from "../prisma"
import bcrypt from 'bcrypt'
import { error } from "console"



export default class usuarioControlador {
    async create(req: Request, res: Response): Promise<any> {

        const { nome, email, senha } = req.body

        if (!nome || !email || !senha) {
            return res.status(404).json({
                erro: 'Todos os campos são obrigatórios'
            })
        }

        const senhaForte = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
        const validarSenhaForte = senhaForte.test(senha)
        if (validarSenhaForte) {
            return res.status(400).json({
                mensagem: 'Sua senha tem que ter no mínimo 8 caracteres contendo uma letra maiúsculo e menúscula e pelo menos um número'
            })
        }

        try {
            const existeEmail = await prisma.usuario.findUnique({
                where: {
                    email
                }
            })

            if (existeEmail) {
                return res.status(400).json({
                    mensagem: 'E-mail informado já existe.'
                })
            }

            const senhacriptografado = await bcrypt.hash(senha, 10)
            const cadastra = await prisma.usuario.create({
                data: {
                    nome,
                    email,
                    senha: senhacriptografado
                }
            })


            const { senha: _, ...usuario } = cadastra
            if (!cadastra) {
                return res.status(404).json({
                    erro: 'Erro ao cadastra o usuário'
                })
            }

            return res.status(201).json(usuario)
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                erro: 'Erro ao cadastra o usuário'
            })
        }
    }

    async deletar(req: Request, res: Response): Promise<any> {
        const { id } = req.params

        try {
            const excluir = await prisma.usuario.delete({ where: { id: Number(id) } })

            if (!excluir) {
                return res.status(404).json({
                    erro: 'Erro ao deletar o usuario'
                })
            }
            return res.status(200).json(excluir)
        } catch (error) {
            return res.status(400).json({
                erro: 'Erro na aplicação'
            })
        }
    }
}

