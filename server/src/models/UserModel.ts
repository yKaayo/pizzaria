import { PrismaClient } from "../generated/prisma/index.js";
import { User as UserEntity } from "../generated/prisma/index.js";

// Interface
import {
  UserReaderProtocol,
  UserWriterProtocol,
} from "../interfaces/UserProtocol.js";

// Service
import { hashPassword } from "../services/authServices";

// Type
import { User } from "../types/types.js";

export default class UserModel
  implements UserReaderProtocol, UserWriterProtocol
{
  constructor(private readonly _prisma: PrismaClient) {}

  async getById(id: number) {
    return this._prisma.user.findUnique({
      where: { id },
      select: { name: true, email: true },
    });
  }

  async findByEmail(email: string) {
    return this._prisma.user.findFirst({
      where: { email },
      select: { email: true, number: true },
    });
  }

  async create(user: Omit<User, "id">) {
    const { name, email, number, password } = user;
    const hashedPassword = await hashPassword(password);

    return this._prisma.user.create({
      data: { name, email, number, password: hashedPassword },
    });
  }

  async update(id: number, userData: Partial<UserEntity>) {
    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }

    return this._prisma.user.update({ where: { id }, data: userData });
  }

  async delete(id: number) {
    return this._prisma.user.delete({ where: { id } });
  }
}
