import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwt.js';
import { asyncHandler, AppError } from '../middlewares/errorHandler.js';

// Registro
export const register = asyncHandler(async (req, res, next) => {
    const { username, email, password, role = 'tester' } = req.body;

    // Valida que el rol sea correcto
    if (role && !['admin', 'tester'].includes(role)) {
        throw new AppError('Rol no válido. Debe ser "admin" o "tester"', 400);
    }

    // Verificar si el usuario ya existe
    const existingUser = User.findByUsername(username);
    if (existingUser) {
        throw new AppError('El nombre de usuario ya está en uso', 409);
    }

    // Verificar si el email ya existe
    const existingEmail = User.findByEmail(email);
    if (existingEmail) {
        throw new AppError('El email ya está registrado', 409);
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = User.create({
        username,
        email,
        password: hashedPassword,
        role
    });

    // Generar token JWT
    const token = jwt.sign(
        {
            id: newUser.id,
            username: newUser.username,
            role: newUser.role
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: {
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            },
            token
        }
    });
});

// Login
export const login = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    // Validar campos obligatorios
    if (!username || !password) {
        throw new AppError('Usuario y contraseña son obligatorios', 400);
    }

    // Buscar usuario
    const user = User.findByUsername(username);
    if (!user) {
        throw new AppError('Credenciales incorrectas', 401);
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError('Credenciales incorrectas', 401);
    }

    // Generar token JWT
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
        success: true,
        message: 'Login exitoso',
        data: {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        }
    });
});

// Obtener perfil del usuario autenticado
export const getProfile = asyncHandler(async (req, res, next) => {
    const user = User.findById(req.user.id);

    if (!user) {
        throw new AppError('Usuario no encontrado', 404);
    }

    res.json({
        success: true,
        data: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        }
    });
});