import { PrismaClient } from "../generated/prisma/index.js";

// Types
import { Image as ImageEntity } from "../generated/prisma/index.js";

// Interface
import { FileProtocol } from "../interfaces/FileProtocol.js";

export default class FileModel implements FileProtocol {
  constructor(private readonly _prisma: PrismaClient) {}

  async getOne(id: number) {
    return await this._prisma.image.findUnique({
      where: { id },
    });
  }

  async create(image: Omit<ImageEntity, "id">) {
    return await this._prisma.image.create({
      data: image,
    });
  }
}
