import { Router, Request, Response } from "express";
import { validateInput } from "../middlewares/validate-input";
import {
  ValidatePassword,
  ValidatePasswordInputSchema,
} from "../usecases/validation/ValidatePassword";
import { Lifecycle, inject, scoped } from "tsyringe";

@scoped(Lifecycle.ContainerScoped)
export class ValidationController {
  private router: Router;

  constructor(
    @inject("ValidatePassword")
    private readonly validatePassword: ValidatePassword
  ) {
    this.router = Router();
  }

  get routes() {
    this.router.post(
      "/password",
      validateInput(ValidatePasswordInputSchema),
      this.password.bind(this)
    );

    return this.router;
  }

  private password(req: Request, res: Response) {
    const { password } = req.body;

    const isValid = this.validatePassword.handle({ password });
    res.status(200).json({
      isValid,
    });
  }
}
