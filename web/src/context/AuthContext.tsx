import { createContext, useState, useEffect, ReactNode } from "react";
import api from "../services/api";

interface User {
	id: string;
	name: string;
}

interface AuthContextType {
	signed: boolean;
	user: User | null;
	signIn: (token: string, user: User) => void;
	signOut: () => void;
	loading: boolean;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const storagedUser = localStorage.getItem("@Auth:user");
		const storagedToken = localStorage.getItem("@Auth:token");

		if (storagedToken && storagedUser) {
			setUser(JSON.parse(storagedUser));
			api.defaults.headers.common["Authorization"] = `Bearer ${storagedToken}`;
		}
		setLoading(false);
	}, []);

	function signIn(token: string, userData: User) {
		setUser(userData);
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		localStorage.setItem("@Auth:user", JSON.stringify(userData));
		localStorage.setItem("@Auth:token", token);
	}

	function signOut() {
		setUser(null);
		localStorage.clear();
	}

	return (
		<AuthContext.Provider
			value={{ signed: !!user, user, signIn, signOut, loading }}
		>
			{children}
		</AuthContext.Provider>
	);
}
