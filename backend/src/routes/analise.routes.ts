import { Router } from "express";
import { upload } from "../config/multer";
import { analiseController } from "../controllers/analise.controller";

const router = Router();

router.post(
  "/analisar",
  upload.single("imagem"),
  analiseController.analisar
);

export { router as analiseRoutes };