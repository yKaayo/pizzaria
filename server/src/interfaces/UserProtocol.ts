// Types
import { UserGetById } from "../../types/userTypes.js";
import { User as UserEntity } from "../generated/prisma/index.js";

export interface UserProtocol {
  getById(id: number): Promise<UserGetById | null>;
  findByEmail(
    email: string
  ): Promise<Pick<UserEntity, "email" | "number"> | null>;
  create(user: UserEntity): Promise<UserEntity>;
  update(id: number, userData: Partial<UserEntity>): Promise<UserEntity>;
  delete(id: number): Promise<UserEntity>;
}

