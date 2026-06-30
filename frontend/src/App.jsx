import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import RequireAuth from "./components/RequireAuth";
import RequireAdmin from "./components/RequireAdmin";  // ← NUEVO
import { AuthProvider, useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Reportes from "./pages/Reportes";
import Login from "./pages/Login";
import AdminUsers from "./pages/AdminUsers";  // ← NUEVO

function AppContent() {
    const { loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                color: 'white',
                fontSize: '18px'
            }}>
                Cargando...
            </div>
        );
    }

    return (
        <div className="app-root">
            <BrowserRouter>
                <Header />

                <div className="app-layout">
                    <Routes>
                        <Route path="/login" element={<Login />} />

                        <Route
                            path="/"
                            element={
                                <RequireAuth>
                                    <Home />
                                </RequireAuth>
                            }
                        />

                        <Route
                            path="/reportes"
                            element={
                                <RequireAuth>
                                    <Reportes />
                                </RequireAuth>
                            }
                        />

                        {/* ← NUEVO: Ruta protegida solo para admin */}
                        <Route
                            path="/admin/users"
                            element={
                                <RequireAuth>
                                    <RequireAdmin>
                                        <AdminUsers />
                                    </RequireAdmin>
                                </RequireAuth>
                            }
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}