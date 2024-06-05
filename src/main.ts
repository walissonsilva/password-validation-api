import "dotenv/config";
import "reflect-metadata";
import { env } from "./env";
import { app } from "./express";

app.listen(env.Port, () => {
  console.log(`Server is running on port ${env.Port}`);
});
