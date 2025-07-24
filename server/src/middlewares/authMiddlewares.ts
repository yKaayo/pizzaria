import "dotenv/config";
import { PrismaClient } from "../generated/prisma/index.js";

// Types
import { FastifyRequest, FastifyReply } from "fastify";

// Model
import UserModel from "../models/UserModel.js";

// Service
import { verifyToken } from "../services/authServices.js";

export const loginRequired = async (req: FastifyRequest, rep: FastifyReply) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return rep.status(401).send({ error: "É necessário estar logado!" });
  }

  const prisma = new PrismaClient();
  const token = authorization.split(" ")[1];

  const userModel = new UserModel(prisma);

  try {
    const id = verifyToken(token);

    const user = await userModel.getById(id);
    if (!user)
      return rep.status(400).send({ error: "Usuário não encontrado!" });
  } catch (error) {
    console.error(error);
    return rep.status(401).send({ error: "Token inválido." });
  }
};
