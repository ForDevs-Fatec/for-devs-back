import { Request, Response } from "express";
import { Review } from "../entities-dados/Review"; 
import { dadosRepository } from "../repositories/dadosRepository";

class DadosController {
  async searchReviews(req: Request, res: Response) {
    try {
      const { query } = req.body; 

      if (!query) {
        return res.status(400).json({ error: "Consulta vazia." });
      }

      return res.status(200).json(await dadosRepository.find());
    } catch (error) { 
      console.log("Erro na pesquisa de reviews:", error);
      return res.status(500).json({ error: "Erro na pesquisa de reviews." });
    }
  }
}

export { DadosController };
