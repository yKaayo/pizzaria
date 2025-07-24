// Controllers
import { store } from "../controllers/tokenController.js";

export default async function token(fastify) {
  fastify.post("/", store);
}
