// Controllers
import { createPizza } from "../controllers/pizzaController.js";

// Middleware
import { isAdmin } from "../middlewares/AdminMiddleware.js";

export default async function pizza(fastify) {
  fastify.post("/criar", { preHandler: isAdmin }, createPizza);
}
