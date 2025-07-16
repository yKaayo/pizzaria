import { FastifyRequest, FastifyReply } from "fastify";
import validator from "validator";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import UserModel from "../models/UserModel.js";
import { User } from "../types/types.js";

const userModel = new UserModel();

export const getUsers = async (_req: FastifyRequest, rep: FastifyReply) => {
  try {
    const users = await userModel.getAll();
    if (!users.length) {
      return rep
        .status(404)
        .send({ error: "Nenhum usuário cadastrado encontrado!" });
    }

    return rep.status(200).send(users);
  } catch (error) {
    rep.log.error({ err: error }, "Erro ao buscar usuários!");
    return rep
      .status(500)
      .send({ error: "Não foi possível obter os usuários no momento!" });
  }
};

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
  const { name, email, number, password } = req.body;
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

    const user = await userModel.create({ name, email, number, password });
    return rep.status(201).send(user);
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
  req: FastifyRequest<{ Params: { id: string }; Body: Partial<User> }>,
  rep: FastifyReply
) => {
  const id = parseInt(req.params.id);
  if (isNaN(id))
    return rep.status(400).send({ error: "O ID fornecido é inválido!" });

  const data = req.body;

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
  req: FastifyRequest<{ Params: { id: string } }>,
  rep: FastifyReply
) => {
  const id = parseInt(req.params.id);
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

    return rep
      .status(500)
      .send({
        error: "Erro ao excluir o usuário. Tente novamente mais tarde!",
      });
  }
};
