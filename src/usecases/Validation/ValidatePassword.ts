import { IPasswordValidatorService } from "src/services/PasswordValidatorService";
import { Lifecycle, inject, scoped } from "tsyringe";

@scoped(Lifecycle.ContainerScoped)
export class ValidatePassword {
  constructor(
    @inject("PasswordValidatorService")
    private readonly passwordValidatorService: IPasswordValidatorService
  ) {}

  handle(password: string): boolean {
    return this.passwordValidatorService.isValid(password);
  }
}
