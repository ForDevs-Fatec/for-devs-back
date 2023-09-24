import { AppDataSource } from "../data-source";
import { Review} from "../entities-dados/Review";

export const dadosRepository = AppDataSource.getRepository(Review)