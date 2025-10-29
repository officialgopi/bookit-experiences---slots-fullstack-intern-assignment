import { createServer } from "http";
import { env } from "./env";
import { connectDb } from "./db";
import { app } from "./app";

const server = createServer(app);

connectDb(env.DATABASE_URL).then(() => {
  server.listen(env.PORT, () => {
    console.log(`# SERVER STARTED ON PORT:${env.PORT}`);
  });
});
