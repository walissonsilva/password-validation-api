import { ValidationRule } from "src/models/ValidationRule";

export class Validator {
  private rules: ValidationRule[];

  constructor() {
    this.rules = [];
  }

  addRule(rule: ValidationRule) {
    this.rules.push(rule);
  }

  validate(input: string): boolean {
    return this.rules
      .map((rule) => rule.validate(input))
      .every((result) => result);
  }
}
