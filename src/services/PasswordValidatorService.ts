import { injectable } from "tsyringe";
import {
  DigitRule,
  LowerCaseRule,
  MinLengthRule,
  NoRepeatedCharactersRule,
  NoSpaceRule,
  SpecialCharacterRule,
  UpperCaseRule,
} from "src/utils/validation/rules/password-rules";
import { Validator } from "src/utils/validation/validator";

export type IPasswordValidatorService = {
  isValid(password: string): boolean;
};

@injectable()
export class PasswordValidatorService implements IPasswordValidatorService {
  private passwordValidator: Validator;

  constructor() {
    this.passwordValidator = new Validator();

    this.passwordValidator.addRule(new MinLengthRule(9));
    this.passwordValidator.addRule(new DigitRule());
    this.passwordValidator.addRule(new LowerCaseRule());
    this.passwordValidator.addRule(new UpperCaseRule());
    this.passwordValidator.addRule(new SpecialCharacterRule());
    this.passwordValidator.addRule(new NoRepeatedCharactersRule());
    this.passwordValidator.addRule(new NoSpaceRule());
  }

  isValid(password: string): boolean {
    return this.passwordValidator.validate(password);
  }
}
