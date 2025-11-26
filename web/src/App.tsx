import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";

// Importando nossas páginas
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";

// Componente para proteger rotas privadas
// Se não estiver logado, manda de volta pro Login
function PrivateRoute({ children }: { children: JSX.Element }) {
	const { signed, loading } = useContext(AuthContext);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				Carregando...
			</div>
		);
	}

	if (!signed) {
		return <Navigate to="/" />;
	}

	return children;
}

export default function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/register" element={<Register />} />

					<Route
						path="/dashboard"
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}
