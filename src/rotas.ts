import { Router } from "express";
import controladorEventos from "./controll/user";

const rotas = Router();

rotas.post('/eventos', new controladorEventos().create);

export default rotas

