import { Request, Response } from "express";
import { analiseService } from "../services/analise.service";

export class AnaliseController {
  async analisar(
    req: Request,
    res: Response
  ) {
    if (!req.file) {
      return res.status(400).json({
        message: "Imagem não enviada"
      });
    }

    const resultado =
      await analiseService.analisarImagem();

    return res.status(200).json({
      arquivo: req.file.filename,
      resultado
    });
  }
}

export const analiseController =
  new AnaliseController();