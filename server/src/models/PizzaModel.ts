import { PrismaClient } from "../generated/prisma/index.js";

// SQL
import { getPizza } from "../generated/prisma/sql/getPizza";

// Types
import { Pizza as PizzaEntity } from "../generated/prisma/index.js";

// Interface
import { PizzaProtocol } from "../interfaces/PizzaProtocol";

export default class PizzaModel implements PizzaProtocol {
  constructor(private readonly _prisma: PrismaClient) {}

  async getAll() {
    return await this._prisma.$queryRawTyped(getPizza());
  }

  async getById(id: number) {
    return await this._prisma.pizza.findUnique({
      where: {
        id,
      },
      include: {
        Image: {
          select: {
            path: true,
          },
        },
      },
    });
  }

  async create(pizza: Omit<PizzaEntity, "id">) {
    return await this._prisma.pizza.create({
      data: pizza,
    });
  }
}
