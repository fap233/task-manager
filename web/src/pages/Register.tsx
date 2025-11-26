import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import api from "../services/api";

export function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	async function handleRegister(e: FormEvent) {
		e.preventDefault();
		try {
			await api.post("/auth/register", { name, email, password });
			alert("Cadastro realizado! Faça login.");
			navigate("/");
		} catch (error) {
			alert("Erro ao cadastrar. Tente novamente.");
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
				<div className="flex justify-center mb-6">
					<div className="bg-green-100 p-3 rounded-full">
						<UserPlus className="w-8 h-8 text-green-600" />
					</div>
				</div>

				<h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
					Crie sua conta
				</h2>

				<form onSubmit={handleRegister} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Nome
						</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Senha
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
						/>
					</div>

					<button
						type="submit"
						className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
					>
						Cadastrar
					</button>
				</form>

				<p className="mt-4 text-center text-sm text-gray-600">
					Já tem conta?{" "}
					<Link to="/" className="text-green-600 font-medium">
						Faça login
					</Link>
				</p>
			</div>
		</div>
	);
}
