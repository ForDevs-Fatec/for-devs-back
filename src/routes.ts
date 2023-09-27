import { Router } from "express"; 
import { UserController } from "./controllers/UserController";
import { authMiddleware } from "./middleware/authMiddleware";
import { DadosController } from "./controllers/DadosController";

const router = Router();

router.post('/user', new UserController().create);
router.get('/users', new UserController().ListUser);
router.put('/user/:id', authMiddleware, new UserController().updateUser);
router.delete('/user/:id', authMiddleware, new UserController().deleteUser);
router.post('/user/login', new UserController().login);

router.get('/reviews/search', new DadosController().searchReviews);

export default router