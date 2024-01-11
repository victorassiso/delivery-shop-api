import fastify from "fastify";
import { transactionRoutes } from "./routes/transactions";

export const app = fastify()

app.register(transactionRoutes, { prefix: "transactions" })