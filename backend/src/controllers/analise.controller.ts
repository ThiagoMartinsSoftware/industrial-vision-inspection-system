import { Request, Response } from "express";

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

    return res.status(200).json({
      message: "Imagem recebida com sucesso",
      arquivo: req.file.filename
    });
  }
}

export const analiseController =
  new AnaliseController();