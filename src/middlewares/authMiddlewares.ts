import jwt from "jsonwebtoken";
import "dotenv/config";
import { FastifyRequest, FastifyReply } from "fastify";

export const loginRequired = async (req: FastifyRequest, rep: FastifyReply) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return rep
      .status(401)
      .send({ error: "É necessário estar logado!" });
  }

  const token = authorization.split(" ")[1];

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(data);
  } catch (error) {
    console.error(error);
    return rep.status(401).send({ error: "Token inválido." });
  }
};
