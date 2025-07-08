// Controllers
import { abc } from "../controllers/homeController.js";

export async function home(fastify) {
  fastify.get("/", abc);
}