import express from "express";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//SWAGGER SETUP
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { options } from "./constants/swagger-option.constant";

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//ROUTES
import { apiRouter } from "./routes";
app.use("/api/v1", apiRouter);

//GLOBAL ERROR HANDLING MIDDLEWARE
import { globalErrorHandler } from "./middlewares/error.middleware";
app.use(globalErrorHandler);

export { app };
