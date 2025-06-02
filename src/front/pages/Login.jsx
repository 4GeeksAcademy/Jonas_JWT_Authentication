import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password })
			});

			if (!response.ok) throw new Error("Credenciales inválidas");

			const data = await response.json();
			sessionStorage.setItem("token", data.access_token); // GUARDAR EN sessionStorage

			alert("Login exitoso");
			navigate("/"); // puedes redirigir a Home u otra página
		} catch (error) {
			alert("Error al iniciar sesión");
		}
	};

	return (
		<div className="container mt-5">
			<h2>Iniciar sesión</h2>
			<form onSubmit={handleLogin}>
				<div className="mb-3">
					<input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
				</div>
				<div className="mb-3">
					<input type="password" className="form-control" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
				</div>
				<button type="submit" className="btn btn-primary">Iniciar sesión</button>
			</form>
		</div>
	);
};

export default Login;

