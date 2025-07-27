import { FastifyInstance } from "fastify";

// Controllers
import { store } from "../controllers/tokenController";

export default async function token(app: FastifyInstance) {
  app.post("/", store);
}
