import { useState, useContext, FormEvent } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import api from "../services/api";

export function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { signIn } = useContext(AuthContext);
	const navigate = useNavigate();

	async function handleLogin(e: FormEvent) {
		e.preventDefault();

		try {
			const response = await api.post("/auth/login", {
				email,
				password,
			});

			const { user, token } = response.data;

			signIn(token, user);
			navigate("/dashboard"); // Redireciona após login
		} catch (error) {
			alert("Erro no login! Verifique seus dados.");
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
				<div className="flex justify-center mb-6">
					<div className="bg-blue-100 p-3 rounded-full">
						<LogIn className="w-8 h-8 text-blue-600" />
					</div>
				</div>

				<h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
					Acesse sua conta
				</h2>

				<form onSubmit={handleLogin} className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							placeholder="seu@email.com"
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
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							placeholder="******"
						/>
					</div>

					<button
						type="submit"
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						Entrar
					</button>
				</form>

				<p className="mt-4 text-center text-sm text-gray-600">
					Não tem uma conta?{" "}
					<Link
						to="/register"
						className="font-medium text-blue-600 hover:text-blue-500"
					>
						Cadastre-se
					</Link>
				</p>
			</div>
		</div>
	);
}
