import mongoose from "mongoose";

async function connectDb(databaseUrl: string) {
  try {
    await mongoose.connect(databaseUrl);
    console.log("# DATABASE CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.error("** DATABASE CONNECTION FAILED **");
    throw error;
  }
}

export { connectDb };
