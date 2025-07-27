import { FastifyInstance } from "fastify";

// Controllers
import { getFile, createFile } from "../controllers/fileController";

export default async function file(fastify: FastifyInstance) {
  fastify.get("/:id", getFile);
  fastify.post("/criar", createFile);
}
