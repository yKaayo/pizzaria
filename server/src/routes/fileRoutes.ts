import { FastifyInstance } from "fastify";

// Controllers
import { createFile } from "../controllers/fileController";

export default async function file(app: FastifyInstance) {
  app.post("/criar", createFile);
}
