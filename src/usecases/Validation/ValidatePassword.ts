import { IPasswordValidatorService } from "src/services/PasswordValidatorService";
import { Lifecycle, inject, scoped } from "tsyringe";
import { z } from "zod";

export const ValidatePasswordInputSchema = z.object({
  password: z.string(),
});

export type ValidatePasswordInput = z.infer<typeof ValidatePasswordInputSchema>;

@scoped(Lifecycle.ContainerScoped)
export class ValidatePassword {
  constructor(
    @inject("PasswordValidatorService")
    private readonly passwordValidatorService: IPasswordValidatorService
  ) {}

  handle(input: ValidatePasswordInput): boolean {
    return this.passwordValidatorService.isValid(input.password);
  }
}
