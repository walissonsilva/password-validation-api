import express from "express";
import cors from "cors";
import helmet from "helmet";
import { registerDependencies } from "./dependency-injection";
import { configureRoutes } from "./routes";
import { errorHandler } from "./middlewares/errors-handler";

export const app = express();

// Middlewares
app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "1mb",
  })
);

registerDependencies();
configureRoutes();

app.get("/", (_, res) =>
  res.status(200).json({
    health: "ok",
  })
);

// Error Handler Middleware
app.use(errorHandler);
