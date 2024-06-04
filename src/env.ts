import { z } from "zod";

const envSchema = z.object({
  Port: z.number({
    message: "Define PORT variable in .env file",
  }),
});

const envValues: z.infer<typeof envSchema> = {
  Port: Number(process.env.PORT),
};

export const env = envSchema.parse(envValues);
