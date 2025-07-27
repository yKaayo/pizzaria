// Types
import { Image as ImageEntity } from "../generated/prisma/index.js";

export interface FileProtocol {
  create(image: Omit<ImageEntity, "id">): Promise<ImageEntity>;
}
