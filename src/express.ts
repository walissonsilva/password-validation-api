import express from "express";
import cors from "cors";
import helmet from "helmet";
import { ValidationController } from "./controllers/ValitionController";
import { ValidatePassword } from "./usecases/Validation/ValidatePassword";

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

const validatePassword = new ValidatePassword();

const validationController = new ValidationController(validatePassword);

app.use("/validate/", validationController.routes);

app.get("/", (_, res) =>
  res.status(200).json({
    health: "ok",
  })
);
