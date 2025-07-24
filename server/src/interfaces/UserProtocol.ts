// Types
import { User as UserEntity } from "../generated/prisma/index.js";
import { User } from "../types/types.js";

export interface UserReaderProtocol {
  getById(id: number): Promise<Pick<UserEntity, "name" | "email"> | null>;
  findByEmail(
    email: string
  ): Promise<Pick<UserEntity, "email" | "number"> | null>;
}

export interface UserWriterProtocol {
  create(user: User): Promise<UserEntity>;
  update(id: number, userData: Partial<UserEntity>): Promise<UserEntity>;
  delete(id: number): Promise<UserEntity>;
}
