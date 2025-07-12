import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "../generated/prisma/index.js";
import { hashPassword } from "../services/authServices.js";

interface UserBody {
  name?: string;
  email: string;
  password: string;
  number?: string;
  [key: string]: any;
}

export default class User {
  private prisma: PrismaClient;
  private body?: UserBody;

  constructor(body?: UserBody) {
    this.body = body;
    this.prisma = new PrismaClient();
  }

  async getAll(rep: FastifyReply) {
    try {
      const users = await this.prisma.user.findMany();
      if (!users || users.length === 0) {
        return rep.status(404).send({ error: "Nenhum usuário encontrado!" });
      }

      return rep.status(200).send(users);
    } catch (error) {
      console.error(error);
      return rep.status(500).send({ error: "Erro ao buscar usuários." });
    }
  }

  async create(rep: FastifyReply) {
    if (!this.body) {
      return rep
        .status(400)
        .send({ error: "Dados do usuário não fornecidos." });
    }

    try {
      const existing = await this.prisma.user.findFirst({
        where: {
          OR: [{ email: this.body.email }, { number: this.body.number || "" }],
        },
        select: {
          email: true,
          number: true,
        },
      });

      if (existing) {
        if (existing.email === this.body.email) {
          return rep.status(409).send({ error: "Email já cadastrado." });
        }
        if (existing.number === this.body.number) {
          return rep.status(409).send({ error: "Número já cadastrado." });
        }
      }

      const { password, ...rest } = this.body;
      const hashedPassword = await hashPassword(password);

      const user = await this.prisma.user.create({
        data: {
          ...rest,
          password: hashedPassword,
        },
      });

      return rep
        .status(201)
        .send({ message: "Usuário criado com sucesso!", user });
    } catch (error) {
      console.error(error);
      return rep.status(500).send({ error: "Erro ao criar usuário." });
    }
  }

  async getUser(id: string, rep: FastifyReply) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: parseInt(id) },
      });

      if (!user) {
        return rep.status(404).send({ error: "Usuário não encontrado." });
      }

      return rep.status(200).send(user);
    } catch (error) {
      console.error(error);
      return rep.status(500).send({ error: "Erro ao buscar usuário." });
    }
  }

  async updateUser(
    req: FastifyRequest<{ Params: { id: string } }>,
    rep: FastifyReply
  ) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return rep.status(400).send({ error: "ID inválido." });
    }

    if (!this.body) {
      return rep
        .status(400)
        .send({ error: "Dados do usuário não fornecidos." });
    }

    try {
      const existing = await this.prisma.user.findUnique({ where: { id } });

      if (!existing) {
        return rep.status(404).send({ error: "Usuário não encontrado." });
      }

      if (this.body.password) {
        this.body.password = await hashPassword(this.body.password);
      }

      const updated = await this.prisma.user.update({
        where: { id },
        data: this.body,
      });

      return rep
        .status(200)
        .send({ message: "Usuário atualizado com sucesso.", user: updated });
    } catch (error) {
      console.error(error);
      return rep.status(500).send({ error: "Erro ao atualizar usuário." });
    }
  }

  async deleteUser(
    req: FastifyRequest<{ Params: { id: string } }>,
    rep: FastifyReply
  ) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return rep.status(400).send({ error: "ID inválido." });
    }

    try {
      const deleted = await this.prisma.user.delete({ where: { id } });

      return rep
        .status(200)
        .send({ message: "Usuário deletado com sucesso.", user: deleted });
    } catch (error: any) {
      console.error(error);

      if (error.code === "P2025") {
        return rep.status(404).send({ error: "Usuário não encontrado." });
      }

      return rep.status(500).send({ error: "Erro ao deletar usuário." });
    }
  }
}
