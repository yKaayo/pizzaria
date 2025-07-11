// Controllers
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

export default async function user(fastify) {
  fastify.get("/", getUsers);
  fastify.get("/:id", getUser);
  fastify.post("/criar", createUser);
  fastify.patch("/atualizar/:id", updateUser);
  fastify.delete("/deletar/:id", deleteUser);
}
