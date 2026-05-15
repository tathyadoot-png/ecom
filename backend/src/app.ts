import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running...");
});

app.get("/api", (req, res) => {
  res.send("API Running...");
});

export default app;