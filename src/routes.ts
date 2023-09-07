import { Router } from "express"; 
import { UserController } from "./controllers/UserController";
import { authMiddleware } from "./middleware/authMiddleware";

const router = Router();

router.post('/user', authMiddleware, new UserController().create);
router.get('/users', authMiddleware, new UserController().ListUser);
router.put('/user', authMiddleware, new UserController().updateUser);
router.delete('/user/:id', authMiddleware, new UserController().deleteUser);
router.post('/user/login', new UserController().login);

export default router