import express from "express";
import cors from "cors";

import { analiseRoutes } from "./routes/analise.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", analiseRoutes);

app.get("/", (_req, res) => {
  return res.json({
    message: "Industrial Vision Inspection API"
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(
    `🚀 Servidor rodando na porta ${PORT}`
  );
});