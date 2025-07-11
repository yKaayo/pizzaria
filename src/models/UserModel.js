import argon2 from "argon2";
import { PrismaClient } from "../generated/prisma/index.js";

export default class User {
  constructor(body) {
    this.body = body;
    this.prisma = new PrismaClient();
  }

  async finishPrisma(prisma) {
    try {
      await prisma.$disconnect();
    } catch (err) {
      console.error(err);
      await prisma.$disconnect();
      process.exit(1);
    }
  }

  async getAll(rep) {
    try {
      const users = await this.prisma.user.findMany();
      await this.finishPrisma(this.prisma);

      if (!users) rep.status(404).send({ error: "Não há nenhum usuário!" });

      return rep.status(200).send(users);
    } catch (error) {
      console.error(error);
      await this.finishPrisma(this.prisma);
      return rep.status(400).send({ error: "Erro ao buscar usuários!" });
    }
  }

  async create(rep) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          OR: [{ email: this.body.email }, { number: this.body.number }],
        },
        select: {
          email: true,
          number: true,
        },
      });

      if (user) {
        if (user.email === this.body.email)
          return rep.status(409).send({ error: "Email já cadastrado!" });

        if (user.number === this.body.number)
          return rep.status(409).send({ error: "Número já cadastrado!" });
      }
    } catch (error) {
      console.error(error);
      return rep.status(400).send({ error: "Erro ao criar o usuário!" });
    }

    const { password, ...rest } = this.body;

    try {
      const hashed_password = await argon2.hash(password);

      const data = {
        ...rest,
        password: hashed_password,
      };

      const user = await this.prisma.user.create({ data });
      await this.finishPrisma(this.prisma);

      if (!user)
        return rep.status(400).send({ error: "Erro ao criar o usuário!" });

      return rep.status(201).send({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      await this.finishPrisma(this.prisma);

      console.error(error);
      return rep.status(400).send({ error: "Erro ao criar o usuário!" });
    }
  }

  async getUser(req, rep) {
    const { id } = req.params;

    if (!id)
      return rep.status(400).send({ error: "ID do usuário não fornecido!" });

    try {
      const user = await this.prisma.user.findUnique({
        where: { id: parseInt(id) },
      });
      await this.finishPrisma(this.prisma);

      if (!user) return rep.status(404).send(null);

      return user;
    } catch (error) {
      console.error(error);
      await this.finishPrisma(this.prisma);

      return rep.status(400).send({ error: "Erro ao buscar usuário!" });
    }
  }

  async updateUser(req, rep) {
    const { id } = req.params;

    if (!id)
      return rep.status(400).send({ error: "ID do usuário não fornecido!" });

    try {
      const user = await this.prisma.user.findUnique({
        where: { id: parseInt(id) },
      });
      await this.finishPrisma(this.prisma);

      if (!user)
        return rep.status(404).send({ error: "Usuário não encontrado!" });
    } catch (error) {
      console.error(error);
      await this.finishPrisma(this.prisma);
    }

    if (this.body.password) {
      try {
        this.body.password = await argon2.hash(this.body.password);
      } catch (error) {
        console.error(error);
        return rep.status(400).send({ error: "Erro ao criptografar a senha!" });
      }
    }

    try {
      const user = await this.prisma.user.update({
        where: { id: parseInt(id) },
        data: this.body,
      });
      await this.finishPrisma(this.prisma);

      return rep.status(200).send({ user });
    } catch (error) {
      console.error(error);
      await this.finishPrisma(this.prisma);
      return rep.status(400).send({ error: "Erro ao atualizar o usuário!" });
    }
  }

  async deleteUser(req, rep) {
    const { id } = req.params;

    if (!id)
      return rep.status(400).send({ error: "ID do usuário não fornecido!" });

    try {
      const user = await this.prisma.user.delete({
        where: { id: parseInt(id) },
      });
      await this.finishPrisma(this.prisma);

      if (!user)
        return rep.status(404).send({ error: "Usuário não encontrado!" });

      return rep.status(200).send({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
      console.error(error);
      await this.finishPrisma(this.prisma);
      return rep.status(400).send({ error: "Erro ao deletar o usuário!" });
    }
  }
}
