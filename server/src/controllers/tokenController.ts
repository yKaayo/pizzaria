import validator from "validator";
import "dotenv/config";
import jwt from "jsonwebtoken";

// Services
import { comparePasswords } from "../services/authServices.js";

// Types
import { FastifyRequest, FastifyReply } from "fastify";
import { User } from "../types/types.js";

// Service
import prisma from "../services/db";

export const store = async (
  req: FastifyRequest<{ Body: Pick<User, "email" | "password"> }>,
  rep: FastifyReply
) => {
  const { email, password } = req.body;

  if (!email) return rep.status(400).send({ error: "Email não informado!" });
  if (!validator.isEmail(email))
    return rep.status(401).send({ error: "Email inválido!" });
  if (!password) return rep.status(400).send({ error: "Senha não informada!" });

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return rep.status(404).send({ error: "Usuário não encontrado!" });

  if (!(await comparePasswords(password, user.password)))
    return rep.status(401).send({ error: "Senha incorreta!" });

  const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return rep.status(200).send({ token });
};
