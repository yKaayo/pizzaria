import { pipeline } from "stream";
import fs from "fs";
import util from "util";
import path from "path";

// Types
import { FastifyReply, FastifyRequest } from "fastify";
import { Pizza as PizzaEntity } from "../generated/prisma/index.js";
import { Image as ImageEntity } from "../generated/prisma/index.js";

// Models
import FileModel from "../models/FileModel";
import PizzaModel from "../models/PizzaModel";

// Service
import prisma from "../services/db";

interface MultipartFile {
  fieldname: string;
  filename: string;
  encoding: string;
  mimetype: string;
  toBuffer: () => Promise<Buffer>;
}

const pizzaModel = new PizzaModel(prisma);
const fileModel = new FileModel(prisma);

export const createFile = async (req: FastifyRequest, rep: FastifyReply) => {
  let id: string | undefined;
  let file: MultipartFile | undefined;

  for await (const part of req.parts()) {
    if (part.type === "file" && part.fieldname === "file") {
      file = part as MultipartFile;
    }

    if (
      part.type === "field" &&
      part.fieldname === "pizzaId" &&
      typeof part.value === "string"
    ) {
      id = part.value;
    }
  }

  if (!file) {
    return rep.status(400).send({ error: "Imagem não enviada!." });
  }

  if (!id) {
    return rep.status(400).send({ error: "ID não informado!." });
  }

  // Validate pizza
  const pizzaId = parseInt(id);
  console.log(pizzaId);

  if (isNaN(pizzaId)) return rep.status(400).send({ error: "ID inválido." });

  try {
    const pizza: PizzaEntity = await pizzaModel.getById(pizzaId);
    if (!pizza) return rep.status(404).send({ error: "Pizza não existe!" });
  } catch (error) {
    rep.log.error(
      { err: error },
      `Erro interno ao buscar usuário com ID ${pizzaId}!`
    );
    return rep.status(500).send({ error: "Erro ao buscar o usuário!" });
  }

  // Validate file
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.mimetype)) {
    return rep.code(400).send({
      error: "Tipo de arquivo não permitido. Use: JPEG, PNG ou WebP",
    });
  }

  const uploadsDir = path.join(process.cwd(), "uploads");
  const extension = file.mimetype.split("/")[1];
  const filename = `${Date.now()}_${Math.floor(
    Math.random() * 100000
  )}.${extension}`;
  const filepath = path.join(uploadsDir, filename);

  try {
    const pump = util.promisify(pipeline);
    await pump(file?.file, fs.createWriteStream(filepath));

    const image: ImageEntity = await fileModel.create({
      path: filepath,
      pizzaId,
    });
    return rep.status(201).send(image);
  } catch (error) {
    rep.log.error({ err: error }, `Erro ao criar a imagem ${filename}!`);
  }
};
