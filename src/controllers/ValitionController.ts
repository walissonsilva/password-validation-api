import { Router, Request, Response } from "express";
import { ValidatePassword } from "src/usecases/Validation/ValidatePassword";

export class ValidationController {
  private router: Router;

  constructor(private readonly validatePassword: ValidatePassword) {
    this.router = Router();
  }

  get routes() {
    this.router.post("/password", this.password.bind(this));

    return this.router;
  }

  private password(req: Request, res: Response) {
    const { password } = req.body;

    const isValid = this.validatePassword.handle(password);
    res.status(200).json({
      isValid,
    });
  }
}
