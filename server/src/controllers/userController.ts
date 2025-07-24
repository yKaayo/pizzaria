import { PrismaClient } from "../generated/prisma/index.js";
import validator from "validator";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// Model
import UserModel from "../models/UserModel.js";

// Types
import { FastifyRequest, FastifyReply } from "fastify";
import { User, RequiredBy } from "../types/types.js";

const userModel = new UserModel(new PrismaClient());

export const getUser = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  rep: FastifyReply
) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return rep.status(400).send({ error: "ID inválido." });

  try {
    const user = await userModel.getById(id);
    if (!user)
      return rep
        .status(404)
        .send({ error: "Usuário não localizado com o ID fornecido." });

    return rep.status(200).send(user);
  } catch (error) {
    rep.log.error(
      { err: error },
      `Erro interno ao buscar usuário com ID ${id}!`
    );
    return rep.status(500).send({ error: "Erro ao buscar o usuário!" });
  }
};

export const createUser = async (
  req: FastifyRequest<{ Body: User }>,
  rep: FastifyReply
) => {
  const { email, number, ...rest } = req.body;
  if (!validator.isEmail(email)) {
    return rep.status(400).send({ error: "E-mail informado é inválido!" });
  }

  if (!validator.isMobilePhone(number, "pt-BR")) {
    return rep
      .status(400)
      .send({ error: "Número de telefone informado é inválido." });
  }

  try {
    const existing = await userModel.findByEmail(email);
    if (existing) {
      if (existing.email === email) {
        return rep
          .status(409)
          .send({ error: "Este e-mail já está cadastrado!" });
      }
      if (existing.number === number) {
        return rep
          .status(409)
          .send({ error: "Este número já está cadastrado." });
      }
    }

    const user = await userModel.create({ email, number, ...rest });

    return rep
      .status(201)
      .send({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    rep.log.error(
      { err: error },
      `Erro interno ao tentar cadastrar usuário com e-mail: (${email}).`
    );
    return rep.status(500).send({
      error: "Erro ao cadastrar o usuário. Tente novamente mais tarde!",
    });
  }
};

export const updateUser = async (
  req: FastifyRequest<{ Body: RequiredBy<User, "id"> }>,
  rep: FastifyReply
) => {
  const { id: _id, email, ...data } = req.body;

  const id = parseInt(_id);
  if (isNaN(id))
    return rep.status(400).send({ error: "O ID fornecido é inválido!" });

  try {
    const existingUser = await userModel.getById(id);
    if (!existingUser) {
      return rep.status(404).send({ error: "Usuário não encontrado." });
    }

    const updated = await userModel.update(id, data);
    return rep.status(200).send({
      message: "Usuário atualizado com sucesso.",
      user: updated,
    });
  } catch (error) {
    rep.log.error(
      { err: error },
      `Erro ao atualizar dados do usuário com ID ${id}!`
    );
    return rep.status(500).send({ error: "Erro ao atualizar usuário!" });
  }
};

export const deleteUser = async (
  req: FastifyRequest<{ Body: { id: string } }>,
  rep: FastifyReply
) => {
  const id = parseInt(req.body.id);
  if (isNaN(id))
    return rep.status(400).send({ error: "O ID fornecido é inválido!" });

  try {
    const deletedUser = await userModel.delete(id);
    return rep.status(200).send(deletedUser);
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return rep.status(404).send({ error: "Usuário não encontrado." });
    } else {
      rep.log.error(
        { err: error },
        `Erro interno ao excluir usuário com ID ${id}!`
      );
    }

    return rep.status(500).send({
      error: "Erro ao excluir o usuário. Tente novamente mais tarde!",
    });
  }
};
