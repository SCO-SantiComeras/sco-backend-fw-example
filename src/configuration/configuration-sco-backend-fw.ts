import { registerAs } from "@nestjs/config";

export const configurationScoBackendFw = registerAs("sco", () => ({
  verbose: process.env.SCO_BACKEND_FW_VERBOSE == "true",
  path: process.env.SCO_BACKEND_FW_PATH,
  folder: process.env.SCO_BACKEND_FW_FOLDER,
  extension: process.env.SCO_BACKEND_FW_EXTENSION,
  response: process.env.SCO_BACKEND_FW_RESPONSE == "true",
  validationPipe: process.env.SCO_BACKEND_FW_VALIDATION_PIPE == "true",
  validationPassport: process.env.SCO_BACKEND_FW_VALIDATION_PASSPORT == "true",
}));