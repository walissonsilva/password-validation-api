export class ValidatePassword {
  constructor() {}

  handle(password: string): boolean {
    return password.length >= 9;
  }
}
