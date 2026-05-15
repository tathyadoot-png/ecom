import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes";

import testRoutes from "./routes/test.routes";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
  origin: [
      process.env.CLIENT_URL as string,
      process.env.ADMIN_URL as string,
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Backend Running...");
});

app.use("/api/auth", authRoutes);

app.use("/api/test", testRoutes);

export default app;