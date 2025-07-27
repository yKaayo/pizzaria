import { fastify, FastifyInstance } from "fastify";
import dotenv from "dotenv";
import fastifyHelmet from "@fastify/helmet";
import cors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import path from "path";

// Routes
import user from "./src/routes/userRoutes";
import pizza from "./src/routes/pizzaRoutes";
import token from "./src/routes/tokenRoutes";
import file from "./src/routes/fileRoutes";

dotenv.config();

const app: FastifyInstance = fastify({
  logger: true,
});

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

// Files
app.register(fastifyMultipart);
app.register(fastifyStatic, {
  root: path.join(process.cwd(), "..", "server", "uploads"),
  prefix: "/uploads/",
});

// Security
app.register(fastifyHelmet, {
  global: true,
  contentSecurityPolicy: false, // desative se estiver em dev e der erro com CSP
});

// Routes
app.register(user, { prefix: "/usuarios" });
app.register(pizza, { prefix: "/pizzas" });
app.register(token, { prefix: "/token" });
app.register(file, { prefix: "/imagem" });

app.listen({ port: 3000 }, () => {
  console.log("Server is running");
});
