import { FastifyInstance } from "fastify";

// Controllers
import { createPizza, getPizzas } from "../controllers/pizzaController";

// Middleware
import { adminRequired } from "../middlewares/adminMiddlewares";

export default async function pizza(fastify: FastifyInstance) {
  fastify.get("/", getPizzas);
  fastify.post("/criar", { preHandler: adminRequired }, createPizza);
}
