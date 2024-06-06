import { describe, expect, it } from "vitest";
import { PasswordValidator } from "./PasswordValidator";

describe("PasswordValidator", () => {
  describe("PasswordValidator", () => {
    it("should return true if password is valid", () => {
      const passwordValidator = new PasswordValidator();

      const result = passwordValidator.validate("AbTp9!fok");
      expect(result).toBe(true);
    });

    it("should return false if password is invalid", () => {
      const passwordValidator = new PasswordValidator();

      const result = passwordValidator.validate("AbTp9 fok");
      expect(result).toBe(false);
    });
  });
});
