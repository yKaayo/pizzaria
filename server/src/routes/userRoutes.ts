import { FastifyInstance } from "fastify";

// Controllers
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

// Middleware
import { loginRequired } from "../middlewares/authMiddlewares";

export default async function user(app: FastifyInstance) {
  app.get("/:id", getUser);
  app.post("/criar", createUser);
  app.patch("/atualizar", { preHandler: loginRequired }, updateUser);
  app.delete("/deletar", { preHandler: loginRequired }, deleteUser);
}
