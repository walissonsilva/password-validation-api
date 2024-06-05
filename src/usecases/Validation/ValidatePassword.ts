import { Lifecycle, autoInjectable, injectable, scoped } from "tsyringe";

@scoped(Lifecycle.ContainerScoped)
export class ValidatePassword {
  constructor() {}

  handle(password: string): boolean {
    return password.length >= 9;
  }
}
