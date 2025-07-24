import argon2 from "argon2";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const comparePasswords = async (
  password: string,
  password_hashed: string
) => {
  try {
    return await argon2.verify(password_hashed, password);
  } catch (error) {
    console.error(error);
    throw new Error("Error comparing passwords");
  }
};

export const hashPassword = async (password: string) => {
  try {
    return await argon2.hash(password);
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criptografar a senha!");
  }
};

export const verifyToken = (token: string) => {
  try {
    const { id } = jwt.verify(token, process.env.TOKEN_SECRET);

    return parseInt(id);
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao verificar o token!");
  }
};
