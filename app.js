import http from "http";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import { notFound } from "./middleware/not-found.js";
import authRouter from "./routes/auth.js";
import jobsRouter from "./routes/jobs.js";

dotenv.config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const server = express();

    // Application specific middleware
    server.use(express.json());

    // Route
    server.use("/api/v1/auth", authRouter);
    server.use("/api/v1/jobs", jobsRouter);

    // Not found middleware
    server.use(notFound);

    // Error handling middleware
    server.use(errorHandlerMiddleware);

    const PORT = process.env.PORT || 8000;
    http.createServer(server).listen(PORT, function () {
      console.info("Server is listening on:", this.address());
    });
  } catch (error) {
    console.log(error);
  }
};

start();
