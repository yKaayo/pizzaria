import Fastify from "fastify";
import dotenv from "dotenv";
import fastifyHelmet from "@fastify/helmet";
import cors from "@fastify/cors";

// Routes
import { home } from "./src/routes/homeRoutes.js";

dotenv.config();

const app = Fastify({
  logger: true,
});

await app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

// Security
app.register(fastifyHelmet, {
  global: true,
  contentSecurityPolicy: false, // desative se estiver em dev e der erro com CSP
});

// Routes
app.register(home);

app.listen({ port: 3000 }, () => {
  console.log("Server is running");
  
});
