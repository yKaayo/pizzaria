// Types
import { Image as ImageEntity } from "../generated/prisma/index.js";

export interface FileProtocol {
  getOne(id: number): Promise<ImageEntity | null>;
  create(image: Omit<ImageEntity, "id">): Promise<ImageEntity>;
}
