import { useContext, useEffect, useState, FormEvent } from "react";
import { AuthContext } from "../context/AuthContext";
import { LogOut, Plus, Trash2, CheckCircle, Circle } from "lucide-react";
import api from "../services/api";

interface Task {
	id: string;
	title: string;
	status: "pendente" | "concluida";
}

export function Dashboard() {
	const { user, signOut } = useContext(AuthContext);
	const [tasks, setTasks] = useState<Task[]>([]);
	const [newTask, setNewTask] = useState("");

	// 1. Carregar tarefas ao abrir a página
	useEffect(() => {
		async function loadTasks() {
			try {
				const response = await api.get("/tasks");
				setTasks(response.data);
			} catch (error) {
				console.error("Erro ao buscar tarefas", error);
			}
		}
		loadTasks();
	}, []);

	// 2. Criar nova tarefa
	async function handleAddTask(e: FormEvent) {
		e.preventDefault();
		if (!newTask) return;

		try {
			const response = await api.post("/tasks", {
				title: newTask,
			});

			// Adiciona na lista visualmente sem precisar recarregar
			setTasks([response.data, ...tasks]);
			setNewTask("");
		} catch (error) {
			alert("Erro ao criar tarefa.");
		}
	}

	// 3. Deletar tarefa
	async function handleDelete(id: string) {
		try {
			await api.delete(`/tasks/${id}`);
			// Remove da lista visualmente
			setTasks(tasks.filter((task) => task.id !== id));
		} catch (error) {
			alert("Erro ao deletar tarefa.");
		}
	}

	// 4. Marcar como concluída/pendente
	async function handleToggle(id: string, currentStatus: string) {
		const newStatus = currentStatus === "pendente" ? "concluida" : "pendente";

		try {
			await api.put(`/tasks/${id}`, { status: newStatus });

			// Atualiza a lista localmente
			setTasks(
				tasks.map((task) =>
					task.id === id ? { ...task, status: newStatus } : task,
				),
			);
		} catch (error) {
			alert("Erro ao atualizar status.");
		}
	}

	return (
		<div className="min-h-screen bg-gray-100">
			{/* Header */}
			<header className="bg-white shadow">
				<div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
					<h1 className="text-2xl font-bold text-gray-800">Minhas Tarefas</h1>
					<div className="flex items-center gap-4">
						<span className="text-gray-600 font-medium">Olá, {user?.name}</span>
						<button
							onClick={signOut}
							className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
							title="Sair"
						>
							<LogOut size={20} />
						</button>
					</div>
				</div>
			</header>

			<main className="max-w-4xl mx-auto py-8 px-4">
				{/* Formulário de Adicionar */}
				<form onSubmit={handleAddTask} className="flex gap-2 mb-8">
					<input
						type="text"
						placeholder="O que você precisa fazer hoje?"
						className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
					/>
					<button
						type="submit"
						className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm"
					>
						<Plus size={20} />
						Adicionar
					</button>
				</form>

				{/* Lista de Tarefas */}
				<div className="space-y-3">
					{tasks.map((task) => (
						<div
							key={task.id}
							className={`bg-white p-4 rounded-lg shadow-sm border-l-4 flex items-center justify-between transition-all ${
								task.status === "concluida"
									? "border-green-500 opacity-75"
									: "border-blue-500"
							}`}
						>
							<div className="flex items-center gap-3">
								<button onClick={() => handleToggle(task.id, task.status)}>
									{task.status === "concluida" ? (
										<CheckCircle className="text-green-500 cursor-pointer" />
									) : (
										<Circle className="text-gray-400 hover:text-blue-500 cursor-pointer" />
									)}
								</button>
								<span
									className={`text-lg ${task.status === "concluida" ? "line-through text-gray-500" : "text-gray-800"}`}
								>
									{task.title}
								</span>
							</div>

							<button
								onClick={() => handleDelete(task.id)}
								className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"
							>
								<Trash2 size={18} />
							</button>
						</div>
					))}

					{tasks.length === 0 && (
						<div className="text-center text-gray-500 mt-10">
							<p>Nenhuma tarefa por aqui. Aproveite o dia! 🏖</p>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
