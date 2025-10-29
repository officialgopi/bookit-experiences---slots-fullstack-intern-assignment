import path from "path";
import { env } from "../../env";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BOOKIT API",
      version: "1.0.0",
      description: "API documentation for the BOOKIT application",
    },
    servers: [
      {
        url: env.BASE_URL,
      },
    ],
  },
  apis: [
    path.resolve(__dirname, "../routes/*.js"),
    path.resolve(__dirname, "../routes/*.ts"),
  ],
};

export { options };
