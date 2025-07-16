import { PrismaClient, User as UserEntity } from "../generated/prisma/index.js";

// Service
import { hashPassword } from "../services/authServices.js";

// Type
import { User } from "../types/types.js";

export default class UserModel {
  private readonly prisma = new PrismaClient();

  async getAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany();
  }

  async getById(id: number): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: { email },
      select: { email: true, number: true },
    });
  }

  async create(user: User) {
    const { name, email, number, password } = user;
    const hashedPassword = await hashPassword(password);

    return this.prisma.user.create({
      data: { name, email, number, password: hashedPassword },
    });
  }

  async update(id: number, data: Partial<User>) {
    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
