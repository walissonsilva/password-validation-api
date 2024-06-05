import { ValidationRule } from "src/models/ValidationRule";

interface IBaseValidator {
  validate(input: string): boolean;
}

export class BaseValidator implements IBaseValidator {
  private rules: ValidationRule[];

  constructor(rules: ValidationRule[]) {
    this.rules = rules;
  }

  validate(input: string): boolean {
    return this.rules
      .map((rule) => rule.validate(input))
      .every((result) => result);
  }
}
