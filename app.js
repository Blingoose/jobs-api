import http from "http";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import { notFound } from "./middleware/not-found.js";
import { auth } from "./middleware/authentication.js";
import authRouter from "./routes/auth.js";
import jobsRouter from "./routes/jobs.js";
//extra security packages
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import rateLimiter from "express-rate-limit";

dotenv.config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const server = express();

    // Application specific middleware
    server.set("trust proxy", 1);
    server.use(
      rateLimiter({
        windowMs: 15 * 60 * 1000, //15 minutes
        max: 100, // limit each IP to 100 request per windows.
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        message: "Too many request my friend! try again in 15 minutes",
      })
    );
    server.use(express.json());
    server.use(helmet());
    server.use(cors());
    server.use(xss());

    // Route
    server.use("/api/v1/auth", authRouter);
    server.use("/api/v1/jobs", auth, jobsRouter);

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
