import "reflect-metadata";
import { beforeAll, describe, expect, it } from "vitest";
import { ValidatePassword } from "./ValidatePassword";
import { container } from "tsyringe";
import { registerDependencies } from "src/dependency-injection";

describe("ValidatePassword", () => {
  beforeAll(() => {
    registerDependencies();
  });

  it("should return false if password is invalid", () => {
    const validatePassword = container.resolve(ValidatePassword);

    const result = validatePassword.handle({ password: "AbTp9!foA" });
    expect(result).toBe(false);
  });

  it("should return true if password is valid", () => {
    const validatePassword = container.resolve(ValidatePassword);

    const result = validatePassword.handle({ password: "AbTp9!fok" });
    expect(result).toBe(true);
  });
});
