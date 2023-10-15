import { Request, Response } from 'express';
import { getCollection } from '../repositories/dados_processadosPepository';

export async function getDataProcessado(req: Request, res: Response) {
  try {
    const data = await getCollection()
      .find({})
      .project({reviewer_id: 1, overall_rating: 1, sentiment: 1 })
      .toArray();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar os dados.' });
  }
}