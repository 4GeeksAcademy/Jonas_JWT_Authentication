import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();
	const token = sessionStorage.getItem("token");

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		alert("Sesión cerrada");
		navigate("/");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto d-flex gap-2">
					<Link to="/demo">
						<button className="btn btn-secondary">Demo Context</button>
					</Link>

					{token ? (
						<>
							<Link to="/private">
								<button className="btn btn-warning">Área Privada</button>
							</Link>
							<button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
						</>
					) : (
						<>
							<Link to="/login">
								<button className="btn btn-outline-primary">Login</button>
							</Link>
							<Link to="/signup">
								<button className="btn btn-outline-success">Registro</button>
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};
