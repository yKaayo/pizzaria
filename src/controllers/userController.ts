import { FastifyRequest, FastifyReply } from "fastify";

// Model
import User from "../models/UserModel.js";

export const getUsers = async (req: FastifyRequest, rep: FastifyReply) => {
  const userInstance = new User();
  return await userInstance.getAll(rep);
};

export const getUser = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  rep: FastifyReply
) => {
  const id = req.params.id;

  const userInstance = new User();
  return await userInstance.getUser(id, rep);
};

export const createUser = async (req: FastifyRequest, rep: FastifyReply) => {
  const user = new User(req.body);

  return await user.create(rep);
};

export const updateUser = async (req: FastifyRequest, rep: FastifyReply) => {
  const user = new User(req.body);

  return await user.updateUser(req, rep);
};

export const deleteUser = async (req: FastifyRequest, rep: FastifyReply) => {
  const userInstance = new User();

  return await userInstance.deleteUser(req, rep);
};
