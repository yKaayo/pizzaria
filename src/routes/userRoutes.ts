import { FastifyInstance } from 'fastify';

// Controllers
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

// Middleware
import { loginRequired } from "../middlewares/authMiddlewares.js";

export default async function user(app: FastifyInstance) {
  app.get("/", getUsers);
  app.get("/:id", getUser);
  app.post("/criar", createUser);
  app.patch("/atualizar/:id", { preHandler: loginRequired }, updateUser);
  app.delete("/deletar/:id", deleteUser);
}
