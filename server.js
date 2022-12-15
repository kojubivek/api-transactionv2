import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
const app = express();
const PORT = 8000;

//middlewares
app.use(morgan("dev")); // logging all the incoming req infomation
app.use(helmet()); // setting default security headers to protect some attacks
app.use(express.json()); //
app.use(cors());

//MongoDB Connect
import { connectDB } from "./src/config/dbconfig.js";
connectDB();
import userRouter from "./src/routers/userRouter.js";

app.use("/api/v1/user", userRouter);

app.use("*", (req, res, next) => {
  const error = {
    message: "404 page not found",
    code: 200,
  };
  next(error);
});

app.use((error, req, res, next) => {
  const code = error.code || 500;
  res.status(code).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`your server is ready at http://localhost:${PORT}`);
});
