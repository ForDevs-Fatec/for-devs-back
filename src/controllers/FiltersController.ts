import { Request, Response } from "express";
import { dadosRepository } from "../repositories/dadosRepository";

class DataAnalysisController {
  async filterByDay(req: Request, res: Response) {
    try {
      // filtrar e processar os dados por dia
      // resultados em formato JSON
    } catch (error) { 
      console.log("Erro na filtragem por dia:", error);
      return res.status(500).json({ error: "Erro na filtragem por dia." });
    }
  }

  async filterByGender(req: Request, res: Response) {
    try {
      // filtrar e processar os dados por gênero
      // resultados em formato JSON
    } catch (error) { 
      console.log("Erro na filtragem por gênero:", error);
      return res.status(500).json({ error: "Erro na filtragem por gênero." });
    }
  }

  async filterByAge(req: Request, res: Response) {
    try {
      // filtrar e processar os dados por idade
      // resultados em formato JSON
    } catch (error) { 
      console.log("Erro na filtragem por idade:", error);
      return res.status(500).json({ error: "Erro na filtragem por idade." });
    }
  }

  async filterByState(req: Request, res: Response) {
    try {
      // filtrar e processar os dados por estado
      // resultados em formato JSON
    } catch (error) { 
      console.log("Erro na filtragem por estado:", error);
      return res.status(500).json({ error: "Erro na filtragem por estado." });
    }
  }

  async filterByRanking(req: Request, res: Response) {
    try {
      // filtrar e processar os dados por ranking
      // resultados em formato JSON
    } catch (error) { 
      console.log("Erro na filtragem por ranking:", error);
      return res.status(500).json({ error: "Erro na filtragem por ranking." });
    }
  }
}

export { DataAnalysisController };
