import { FastifyInstance } from "fastify";

// Controllers
import { createPizza, getPizzas } from "../controllers/pizzaController";

// Middleware
import { adminRequired } from "../middlewares/adminMiddlewares";

export default async function pizza(app: FastifyInstance) {
  app.get("/", getPizzas);
  app.post("/criar", { preHandler: adminRequired }, createPizza);
}
