import { IValidationRule } from "src/models/ValidationRule";
import { vi } from "vitest";

export class FakeValidationRule implements IValidationRule {
  validate = vi.fn<[string], boolean>();
}
