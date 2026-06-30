import { useState, useEffect } from 'react';
import { getAllUsers, createUser, updateUser, deleteUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/adminusers.css';

const AdminUsers = () => {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'tester'
    });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const response = await getAllUsers();
            setUsers(response.data);
            setError('');
        } catch (err) {
            setError(err.message || 'Error al cargar usuarios');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (user = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                username: user.username,
                email: user.email,
                password: '',
                role: user.role
            });
        } else {
            setEditingUser(null);
            setFormData({
                username: '',
                email: '',
                password: '',
                role: 'tester'
            });
        }
        setShowModal(true);
        setError('');
        setSuccess('');
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingUser(null);
        setFormData({
            username: '',
            email: '',
            password: '',
            role: 'tester'
        });
        setError('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const submitData = {
                username: formData.username,
                email: formData.email,
                role: formData.role
            };

            if (formData.password.trim() !== '') {
                submitData.password = formData.password;
            }

            if (editingUser) {
                await updateUser(editingUser.id, submitData);
                setSuccess('Usuario actualizado correctamente');
            } else {
                if (!formData.password.trim()) {
                    setError('La contraseña es obligatoria');
                    return;
                }
                submitData.password = formData.password;
                await createUser(submitData);
                setSuccess('Usuario creado correctamente');
            }

            await loadUsers();
            setTimeout(() => {
                handleCloseModal();
                setSuccess('');
            }, 1500);

        } catch (err) {
            setError(err.message || 'Error al guardar usuario');
        }
    };

    const handleDelete = async (userId, username) => {
        if (window.confirm(`¿Estás seguro de eliminar al usuario "${username}"?`)) {
            try {
                await deleteUser(userId);
                setSuccess('Usuario eliminado correctamente');
                await loadUsers();
                setTimeout(() => setSuccess(''), 2000);
            } catch (err) {
                setError(err.message || 'Error al eliminar usuario');
            }
        }
    };

    if (loading) {
        return (
            <main className="page">
                <p style={{color: '#ccc'}}>Cargando usuarios...</p>
            </main>
        );
    }

    return (
        <main className="page">
            <div className="page-inner">
                <div className="admin-users-header">
                    <h1 className="page-title">Gestión de Usuarios</h1>
                    <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                        Agregar Usuario
                    </button>
                </div>

                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className="users-table-wrapper">
                    <table className="users-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{textAlign: 'center', color: '#888'}}>
                                    No hay usuarios registrados
                                </td>
                            </tr>
                        ) : (
                            users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                            <span className={`badge badge-${user.role === 'admin' ? 'alta' : 'baja'}`}>
                                                {user.role}
                                            </span>
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <button
                                                className="btn-table btn-edit"
                                                onClick={() => handleOpenModal(user)}
                                            >
                                                Modificar
                                            </button>
                                            <button
                                                className="btn-table btn-delete"
                                                onClick={() => handleDelete(user.id, user.username)}
                                                disabled={user.id === currentUser.id}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="modal-backdrop" onClick={handleCloseModal}>
                        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2 className="modal-title">
                                    {editingUser ? 'Modificar Usuario' : 'Nuevo Usuario'}
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <label className="form-label">Usuario</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <label className="form-label">
                                        Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder={editingUser ? "Dejar vacío para no cambiar" : "Mínimo 4 caracteres"}
                                    />
                                </div>

                                <div className="form-row">
                                    <label className="form-label">Rol</label>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="tester">Tester</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        {editingUser ? 'Guardar Cambios' : 'Crear Usuario'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default AdminUsers;