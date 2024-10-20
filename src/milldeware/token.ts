import { NextFunction, Request, Response } from "express"
import Jwt, { TokenExpiredError } from "jsonwebtoken"
import prisma from "../prisma"
export interface CustomRequest extends Request {
    user?: {
        id: number
        email: string
    }
}

export async function validarToken(req: CustomRequest, res: Response, next: NextFunction): Promise<any> {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({
            erro: 'Falha na autenticação'
        })
    }

    let cleanedToken = authorization.replace("Bearer", "")
    try {
        const { id } = Jwt.verify(cleanedToken, process.env.JWT_SECRET as string) as { id: number }

        const usuario = await prisma.usuario.findUnique({
            where: {
                id
            }
        })

        if (!usuario) {
            return res.status(401).json({
                erro: 'Falha na autenticação'
            })
        }

        req.user = {
            id: usuario.id,
            email: usuario.email
        }

        next()
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(403).json({
                erro: 'Falha na autenticação'
            })
        }
        const erro = error as Error
        return res.status(400).json({
            erro: erro.message
        })
    }


}