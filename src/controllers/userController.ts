// Model
import User from "../models/UserModel.js";

export const getUsers = async (req, rep) => {
  const userInstance = new User();
  return await userInstance.getAll(rep);
};

export const getUser = async (req, rep) => {
  const { id } = req.params;
  const userInstance = new User();

  return await userInstance.getUser(id, rep);
};

export const createUser = async (req, rep) => {
  const user = new User(req.body);

  return await user.create(rep);
};

export const updateUser = async (req, rep) => {
  const user = new User(req.body);

  return await user.updateUser(req, rep);
}

export const deleteUser = async (req, rep) => {
  const userInstance = new User();

  return await userInstance.deleteUser(req, rep);
}