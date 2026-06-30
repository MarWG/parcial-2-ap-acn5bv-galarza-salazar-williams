const API_URL = 'http://localhost:3000/api';


const getAuthToken = () => {
    return localStorage.getItem('token');
};


const getAuthHeaders = () => {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json'
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
};


export async function register(userData) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Error al registrar usuario');
    }

    return data;
}

export async function login(credentials) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
    }

    return data;
}

export async function getProfile() {
    const res = await fetch(`${API_URL}/auth/profile`, {
        headers: getAuthHeaders()
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Error al obtener perfil');
    }

    return data;
}


export async function fetchBugs() {
    const res = await fetch(`${API_URL}/bugs`);

    if (!res.ok) {
        throw new Error('Error al obtener bugs');
    }

    const data = await res.json();
    return data.data;
}

export async function fetchBugById(id) {
    const res = await fetch(`${API_URL}/bugs/${id}`);

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Error al obtener el bug');
    }

    return data.data;
}

export async function fetchMyBugs() {
    const res = await fetch(`${API_URL}/bugs/user/my-bugs`, {
        headers: getAuthHeaders()
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Error al obtener tus bugs');
    }

    return data.data;
}

export async function createBug(bugData) {
    const res = await fetch(`${API_URL}/bugs`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(bugData),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Error al crear bug');
    }

    return data;
}

export async function updateBug(id, bugData) {
    const res = await fetch(`${API_URL}/bugs/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(bugData),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Error al actualizar bug');
    }

    return data;
}

export async function deleteBug(id) {
    const res = await fetch(`${API_URL}/bugs/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Error al eliminar bug');
    }

    return data;
}

export const getAllUsers = async () => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al obtener usuarios');
    }

    return response.json();
};

export const createUser = async (userData) => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear usuario');
    }

    return response.json();
};

export const updateUser = async (id, userData) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al actualizar usuario');
    }

    return response.json();
};

export const deleteUser = async (id) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al eliminar usuario');
    }

    return response.json();
};