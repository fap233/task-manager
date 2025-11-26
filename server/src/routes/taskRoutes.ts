import { Router } from "express";
import {
	getTasks,
	createTask,
	updateTask,
	deleteTask,
} from "../controllers/taskController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Aplica o middleware em TODAS as rotas abaixo
router.use(authMiddleware);

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
