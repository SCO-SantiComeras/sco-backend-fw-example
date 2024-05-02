import { registerAs } from "@nestjs/config";

export const configurationWebSockets = registerAs("ws", () => ({
  enabled: process.env.WEBSOCKETS_ENABLED == "true",
  port: parseInt(process.env.WEBSOCKETS_PORT, 10 || 8001),
  origin: process.env.WEBSOCKETS_ORIGIN,
}));