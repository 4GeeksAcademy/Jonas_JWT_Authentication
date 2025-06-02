import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Private = () => {
	const navigate = useNavigate();
	const token = sessionStorage.getItem("token");
	const [email, setEmail] = useState("");

	useEffect(() => {
		if (!token) {
			alert("Debes iniciar sesión para acceder");
			navigate("/login");
			return;
		}

		const getUserInfo = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});

				if (!response.ok) throw new Error("Token inválido");

				const data = await response.json();
				setEmail(data.email);
			} catch (error) {
				alert("Sesión expirada. Vuelve a iniciar sesión.");
				sessionStorage.removeItem("token");
				navigate("/login");
			}
		};

		getUserInfo();
	}, [token, navigate]);

	return (
		<div className="container mt-5">
			<h2>Área privada</h2>
			<p>Bienvenido, tu email es: <strong>{email}</strong></p>
		</div>
	);
};

export default Private;
