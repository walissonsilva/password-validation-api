import express from "express";
import cors from "cors";
import helmet from "helmet";
import { registerDependencies } from "./dependency-injection";
import { configureRoutes } from "./routes";

export const app = express();

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
