import { ValidationRule } from "src/models/ValidationRule";

export class MinLengthRule implements ValidationRule {
  constructor(private minLength: number) {}

  validate(password: string): boolean {
    return password.length >= this.minLength;
  }
}

export class LowerCaseRule implements ValidationRule {
  validate(password: string): boolean {
    return /[a-z]/.test(password);
  }
}

export class UpperCaseRule implements ValidationRule {
  validate(password: string): boolean {
    return /[A-Z]/.test(password);
  }
}

export class DigitRule implements ValidationRule {
  validate(password: string): boolean {
    return /\d/.test(password);
  }
}

export class SpecialCharacterRule implements ValidationRule {
  validate(password: string): boolean {
    return /[!@#$%^&*()\-\+]/.test(password);
  }
}

export class NoRepeatedCharactersRule implements ValidationRule {
  validate(password: string): boolean {
    if (/(\w).*\1/.test(password)) return false;
    return true;
  }
}

export class NoSpaceRule implements ValidationRule {
  validate(password: string): boolean {
    const hasSpace = /\s/.test(password);
    return !hasSpace;
  }
}
