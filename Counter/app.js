import express from "express";
import counterRoutes from "./src/routes/counter.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Redis Counter API is running",
  });
});

app.use("/api/counter", counterRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});