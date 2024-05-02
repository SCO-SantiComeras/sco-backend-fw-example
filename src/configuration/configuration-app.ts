import { registerAs } from "@nestjs/config";

export const configurationApp = registerAs("app", () => ({
  env: process.env.APP_ENV,
  port: parseInt(process.env.APP_PORT, 10 || 3000),
  host: process.env.APP_HOST,
  production: process.env.APP_PRODUCTION == "true",
}));