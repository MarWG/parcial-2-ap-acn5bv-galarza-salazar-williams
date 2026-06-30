import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BugForm from "../components/BugForm";
import { createBug } from "../services/api";
import "../styles/home.css";

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const navigate = useNavigate();

    const handleCreate = async (bugData) => {
        try {
            setLoading(true);
            setErrorMsg("");
            setSuccessMsg("");

            await createBug(bugData);

            setSuccessMsg("Bug reportado correctamente");


            setTimeout(() => {
                setSuccessMsg("");
            }, 2000);

        } catch (err) {

            if (err.message.includes('Token expirado') || err.message.includes('Token inválido')) {
                setErrorMsg("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
                setTimeout(() => {
                    localStorage.removeItem('token');
                    navigate('/login');
                }, 2000);
            } else {
                setErrorMsg(err.message || "Error al reportar el bug");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="page home-page">
            <div className="page-inner">
                <div className="card home-card">
                    <h1 className="page-title">Reportá tu bug</h1>

                    {errorMsg && <div className="alert alert-error">{errorMsg}</div>}
                    {successMsg && <div className="alert alert-success">{successMsg}</div>}

                    <BugForm onBugCreated={handleCreate} loading={loading} />

                    <div className="home-actions">
                        <button
                            type="submit"
                            form="bugForm"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Reportando...' : 'Reportar bug'}
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/reportes")}
                            disabled={loading}
                        >
                            Ver historial
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}