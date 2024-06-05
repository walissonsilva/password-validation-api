import { container } from "tsyringe";
import { app } from "./express";
import { ValidationController } from "./controllers/ValitionController";

export function configureRoutes() {
  const validationController = container.resolve(ValidationController);
  app.use("/validate/", validationController.routes);
}
