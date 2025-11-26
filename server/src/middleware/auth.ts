// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
	id: string;
	iat: number;
	exp: number;
}

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ error: "Token não fornecido" });
	}

	// O formato geralmente é "Bearer <token>"
	const token = authorization.replace("Bearer", "").trim();

	try {
		const data = jwt.verify(token, process.env.JWT_SECRET as string);

		const { id } = data as TokenPayload;

		// Aqui usamos um "truque" para passar o ID pro controller
		// Em projetos maiores, criaríamos uma tipagem personalizada (@types)
		(req as any).userId = id;

		return next(); // Pode passar, tá liberado!
	} catch {
		return res.status(401).json({ error: "Token inválido" });
	}
};
