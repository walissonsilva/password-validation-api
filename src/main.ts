import "dotenv/config";
import express from "express";
import { env } from "./env";

const app = express();

app.listen(env.Port, () => {
  console.log(`Server is running on port ${env.Port}`);
});
