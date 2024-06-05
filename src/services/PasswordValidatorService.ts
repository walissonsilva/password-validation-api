import { IPasswordValidator } from "src/validators/PasswordValidator/PasswordValidator";
import { inject, injectable } from "tsyringe";

export type IPasswordValidatorService = {
  isValid(password: string): boolean;
};

@injectable()
export class PasswordValidatorService implements IPasswordValidatorService {
  constructor(
    @inject("PasswordValidator")
    private readonly passwordValidator: IPasswordValidator
  ) {}

  isValid(password: string): boolean {
    return this.passwordValidator.validate(password);
  }
}
