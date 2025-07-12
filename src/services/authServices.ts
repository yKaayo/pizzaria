import argon2 from "argon2";

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
    throw new Error("Error hashing password");
  }
};
