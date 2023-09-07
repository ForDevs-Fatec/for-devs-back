import { Router } from "express"; 
import { UserController } from "./controllers/UserController";

const router = Router();

router.post('/user', new UserController().create);
router.get('/users', new UserController().ListUser);
router.put('/user', new UserController().updateUser);
router.delete('/user/:id', new UserController().deleteUser);
router.post('/user/login', new UserController().login);

export default router