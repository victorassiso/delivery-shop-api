import fastify from "fastify";
import { Router } from "./router";

export const app = fastify()

app.register(Router)