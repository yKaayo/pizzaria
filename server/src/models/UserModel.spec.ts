import { User as UserEntity } from "../generated/prisma/index.js";

// Service
import prisma from "../services/db.js";

// Model
import UserModel from "./UserModel";

describe("UserModel", () => {
  const user = new UserModel(prisma);

  it("It should return a user", async () => {
    const userFound: UserEntity | null = await user.getById(10);

    if (userFound) {
      expect(userFound).toHaveProperty("name");
    }
  });
});
