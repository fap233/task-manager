// src/controllers/taskController.ts
import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const getTasks = async (req: Request, res: Response) => {
	// Pega o ID que o middleware colocou na requisição
	const userId = (req as any).userId;

	const tasks = await prisma.task.findMany({
		where: { userId },
		orderBy: { createdAt: "desc" }, // Mais recentes primeiro
	});

	return res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
	const userId = (req as any).userId;
	const { title, description } = req.body;

	if (!title) {
		return res.status(400).json({ error: "Título é obrigatório" });
	}

	const task = await prisma.task.create({
		data: {
			title,
			description,
			userId,
		},
	});

	return res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
	const userId = (req as any).userId;
	const { id } = req.params;
	const { title, description, status } = req.body;

	try {
		// Verifica se a tarefa é desse usuário antes de atualizar
		const task = await prisma.task.update({
			where: {
				id,
				userId, // Trava de segurança: só atualiza se o dono for o usuário logado
			},
			data: { title, description, status },
		});

		return res.json(task);
	} catch (error) {
		return res
			.status(400)
			.json({ error: "Erro ao atualizar tarefa ou permissão negada" });
	}
};

export const deleteTask = async (req: Request, res: Response) => {
	const userId = (req as any).userId;
	const { id } = req.params;

	try {
		await prisma.task.delete({
			where: {
				id,
				userId, // Trava de segurança
			},
		});

		return res.status(204).send(); // 204 = No Content (sucesso sem corpo)
	} catch (error) {
		return res.status(400).json({ error: "Erro ao deletar tarefa" });
	}
};
