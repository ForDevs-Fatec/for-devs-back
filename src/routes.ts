import { Router } from "express"; 
import { UserController } from "./controllers/UserController";
import { authMiddleware } from "./middleware/authMiddleware";
import { DadosController } from "./controllers/DadosController";
import {getDataProcessado} from "./controllers/Dados_ProcessadosController";
import { getData } from "./controllers/DadosN_ProcessadosController";

const router = Router();

router.post('/user', new UserController().create);
router.get('/users', new UserController().ListUser);
router.put('/user/:id', authMiddleware, new UserController().updateUser);
router.delete('/user/:id', authMiddleware, new UserController().deleteUser);
router.post('/user/login', new UserController().login);

router.get('/reviews/search', new DadosController().searchReviews);

router.get('/api/dados_processados', getDataProcessado);
router.get('/api/dados', getData);

export default router