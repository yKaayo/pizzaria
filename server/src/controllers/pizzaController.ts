import { FastifyReply, FastifyRequest } from "fastify";

// Types
import { Pizza as PizzaEntity } from "../generated/prisma/index.js";

// Model
import PizzaModel from "../models/PizzaModel";

// Service
import prisma from "../services/db";

const pizzaModel = new PizzaModel(prisma);

export const getPizzas = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const users: PizzaEntity[] = await pizzaModel.getAll();
    return rep.status(200).send(users);
  } catch (error) {
    rep.log.error({ err: error }, `Erro interno ao buscar pizzas!`);
    return rep.status(500).send({ error: "Erro ao buscar as pizzas!" });
  }
};

export const createPizza = async (
  req: FastifyRequest<{ Body: Omit<PizzaEntity, "id"> }>,
  rep: FastifyReply
) => {
  const data = req.body;

  try {
    const existing = await pizzaModel.getByName(data.name);
    if (existing) {
      return rep.status(409).send({ error: "Esta pizza já existe!" });
    }

    const pizza: PizzaEntity = await pizzaModel.create(data);

    return rep.status(201).send(pizza);
  } catch (error) {
    rep.log.error(
      { err: error },
      `Erro interno ao tentar criar a pizza: (${data.name}).`
    );
    return rep.status(500).send({
      error: "Erro ao criar a pizza. Tente novamente mais tarde!",
    });
  }
};
