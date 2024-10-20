import { Router } from "express"
import usuarioControlador from "./controll/usuario"

const rotas = Router()

rotas.post('/usuario', new usuarioControlador().create)
rotas.delete('/excluir/:id', new usuarioControlador().deletar)


export default rotas