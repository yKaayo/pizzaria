import { PrismaClient } from "../generated/prisma/index.js";

// Type
import { User as UserEntity } from "../generated/prisma/index.js";

// Interface
import { UserProtocol } from "../interfaces/UserProtocol";

// Service
import { hashPassword } from "../services/authServices";

export default class UserModel implements UserProtocol {
  constructor(private readonly _prisma: PrismaClient) {}

  async getById(id: number) {
    return await this._prisma.user.findUnique({
      where: { id },
      select: { name: true, email: true, is_admin: true },
    });
  }

  async findByEmail(email: string) {
    return await this._prisma.user.findFirst({
      where: { email },
      select: { email: true, number: true },
    });
  }

  async create(user: Omit<UserEntity, "id" | "created_at">) {
    const { password, ...rest } = user;
    const hashedPassword = await hashPassword(password);

    return await this._prisma.user.create({
      data: { ...rest, password: hashedPassword },
    });
  }

  async update(id: number, userData: Partial<UserEntity>) {
    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }

    return await this._prisma.user.update({ where: { id }, data: userData });
  }

  async delete(id: number) {
    return await this._prisma.user.delete({ where: { id } });
  }
}
