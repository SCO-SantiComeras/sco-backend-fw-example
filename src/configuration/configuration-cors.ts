import { registerAs } from "@nestjs/config";

export const configurationCors = registerAs("cors", () => ({
  enabled: process.env.CORS_ENABLED == "true",
  origin: process.env.CORS_ORIGIN,
}));