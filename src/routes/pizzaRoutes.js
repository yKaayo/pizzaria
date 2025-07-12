// Controllers
import { createPizza } from "../controllers/pizzaController.js";

export default async function pizza(fastify) {
  fastify.post("/criar", createPizza);
}
