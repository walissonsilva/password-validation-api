import { container } from "tsyringe";
import { ValidatePassword } from "./usecases/Validation/ValidatePassword";
import { PasswordValidatorService } from "./services/PasswordValidatorService";

export function registerDependencies() {
  container.register("ValidatePassword", ValidatePassword);

  container.register("PasswordValidatorService", PasswordValidatorService);
}
