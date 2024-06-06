import { container } from "tsyringe";
import { ValidatePassword } from "./usecases/validation/ValidatePassword";
import { PasswordValidatorService } from "./services/PasswordValidatorService";
import { PasswordValidator } from "./validators/PasswordValidator/PasswordValidator";

export function registerDependencies() {
  // Validators
  container.register("PasswordValidator", PasswordValidator);

  // Services
  container.register("PasswordValidatorService", PasswordValidatorService);

  // Use cases
  container.register("ValidatePassword", ValidatePassword);
}
