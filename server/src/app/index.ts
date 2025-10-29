import express from "express";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
//ROUTES
import { apiRouter } from "./routes";
app.use("/api/v1", apiRouter);

//GLOBAL ERROR HANDLING MIDDLEWARE
import { globalErrorHandler } from "./middlewares/error.middleware";
app.use(globalErrorHandler);

export { app };
