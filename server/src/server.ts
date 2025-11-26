import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes"; // <--- Importe aqui
import taskRoutes from "./routes/taskRoutes";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Rotas
app.use("/auth", authRoutes); // <--- Adicione aqui

app.get("/", (req, res) => {
	res.json({ message: "API do Task Manager rodando 🚀" });
});
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});
