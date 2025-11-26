import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";

export const register = async (req: Request, res: Response) => {
	try {
		const { name, email, password } = req.body;

		// Verifica se usuário já existe
		const userExists = await prisma.user.findUnique({ where: { email } });
		if (userExists) {
			return res.status(400).json({ error: "E-mail já está em uso." });
		}

		// Criptografa a senha
		const hashPassword = await bcrypt.hash(password, 10);

		// Salva no banco
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashPassword,
			},
		});

		// Retorna sucesso (sem mandar a senha de volta!)
		return res.status(201).json({
			id: user.id,
			name: user.name,
			email: user.email,
		});
	} catch (error) {
		return res.status(500).json({ error: "Erro ao criar usuário" });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		// Busca usuário
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return res.status(400).json({ error: "Credenciais inválidas" });
		}

		// Compara a senha enviada com o hash do banco
		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			return res.status(400).json({ error: "Credenciais inválidas" });
		}

		// Gera o Token JWT
		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
			expiresIn: "1d", // Token expira em 1 dia
		});

		return res.json({ user: { id: user.id, name: user.name }, token });
	} catch (error) {
		return res.status(500).json({ error: "Erro no login" });
	}
};
