import { container } from "tsyringe";
import { ValidatePassword } from "./usecases/Validation/ValidatePassword";

export function registerDependencies() {
  container.register("ValidatePassword", ValidatePassword);
}
