import Fastify from "fastify";
import dotenv from "dotenv";
import fastifyHelmet from "@fastify/helmet";
import cors from "@fastify/cors";

// Routes
import user from "./src/routes/userRoutes.js";
import pizza from "./src/routes/pizzaRoutes.js";

dotenv.config();

const app = Fastify({
  logger: true,
});

app.register(cors, {
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
app.register(user, { prefix: "/usuarios" });
app.register(pizza, { prefix: "/pizzas" });

app.listen({ port: 3000 }, () => {
  console.log("Server is running");
});
