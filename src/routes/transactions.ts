import { FastifyInstance } from "fastify";

export function transactionRoutes(app: FastifyInstance) {
  app.get("/", () => {
    console.log("Hello World!")
  })
}