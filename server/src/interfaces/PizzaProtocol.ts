// Types
import { Pizza as PizzaEntity } from "../generated/prisma/index.js";

export interface PizzaProtocol {
  getAll(): Promise<PizzaEntity[]>;
  getById(id: number): Promise<PizzaEntity | null>;
  create(pizza: Omit<PizzaEntity, "id">): Promise<PizzaEntity>;
}
