import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { InvalidCredentialsError, UserAlreadyExistsError } from "./errors/usersErrors";
import { appRoutes } from "./routes/userRoutes";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.format() });
  }
  if (error instanceof UserAlreadyExistsError) {
    return reply.status(409).send(error);
  }
  if (error instanceof InvalidCredentialsError) {
    return reply.status(400).send(error);
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal server error." });
});
