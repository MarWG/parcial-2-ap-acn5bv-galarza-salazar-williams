import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);

        // Validaciones
        if (!username.trim() || !password.trim()) {
            setErrorMsg("Por favor completa todos los campos");
            setLoading(false);
            return;
        }

        const result = await login(username.trim(), password.trim());

        if (!result.ok) {
            setLoading(false);
            setErrorMsg(result.message || "Credenciales incorrectas");
            return;
        }


        navigate(from, { replace: true });
    };

    return (
        <main className="page login-page page-centered">
            <div className="page-inner">
                <div className="card login-card">
                    <h1 className="login-title">Ingresar a BugLog</h1>

                    {errorMsg && <div className="alert alert-error">{errorMsg}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <label className="form-label">Usuario</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="admin o tester"
                                disabled={loading}
                            />
                        </div>

                        <div className="form-row">
                            <label className="form-label">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="1234"
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full mt-md"
                            disabled={loading}
                        >
                            {loading ? 'Ingresando...' : 'Ingresar'}
                        </button>
                    </form>

                </div>
            </div>
        </main>
    );
}