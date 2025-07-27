import { PrismaClient } from "../generated/prisma/index.js";

// Types
import { FastifyRequest, FastifyReply } from "fastify";

// Model
import UserModel from "../models/UserModel.js";

// Service
import { verifyToken } from "../services/authServices.js";

const userModel = new UserModel(new PrismaClient());

export const adminRequired = async (req: FastifyRequest, rep: FastifyReply) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return rep.status(401).send({ error: "É necessário estar logado!" });
  }

  const token = authorization.split(" ")[1];

  try {
    const id = verifyToken(token);

    const user = await userModel.getById(id);
    if (!user)
      return rep.status(400).send({ error: "Usuário não encontrado!" });

    if (!user.is_admin)
      rep.status(401).send({ error: "Usuário não é administrador!" });
  } catch (error) {
    console.error(error);
    return rep.status(401).send({ error: "Token inválido." });
  }
};
