import { Request, Response } from 'express';
import { getCollection } from '../repositories/dadosN_processadosRepository';

export async function getData(req: Request, res: Response) {
  try {
    const data = await getCollection()
      .find({})
      .project({submission_date: 1, reviewer_id: 1, site_category_lv1: 1, overall_rating: 1, reviewer_birth_year: 1, reviewer_gender: 1, reviewer_state: 1 })
      .toArray();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar os dados.' });
  }
}