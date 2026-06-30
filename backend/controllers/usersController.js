import User from "../models/User.js";
import bcrypt from "bcrypt";
import { asyncHandler, AppError } from "../middlewares/errorHandler.js";

// GET
export const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = User.getAll();

    res.json({
        success: true,
        data: users
    });
});

// POST
export const createUser = asyncHandler(async (req, res, next) => {
    const { username, email, password, role } = req.body;

    const existingUsername = User.findByUsername(username);
    if (existingUsername) {
        throw new AppError('El nombre de usuario ya está en uso', 409);
    }

    const existingEmail = User.findByEmail(email);
    if (existingEmail) {
        throw new AppError('El email ya está registrado', 409);
    }

    const newUser = User.create({
        username,
        email,
        password,
        role: role || 'tester'
    });

    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
        success: true,
        message: 'Usuario creado exitosamente',
        data: userWithoutPassword
    });
});

// PUT
export const updateUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    const existingUser = User.findById(id);
    if (!existingUser) {
        throw new AppError('Usuario no encontrado', 404);
    }


    if (req.user.id === parseInt(id) && role !== existingUser.role) {
        throw new AppError('No puedes cambiar tu propio rol', 403);
    }


    if (username !== existingUser.username) {
        const duplicateUsername = User.findByUsername(username);
        if (duplicateUsername) {
            throw new AppError('El nombre de usuario ya está en uso', 409);
        }
    }


    if (email !== existingUser.email) {
        const duplicateEmail = User.findByEmail(email);
        if (duplicateEmail) {
            throw new AppError('El email ya está en uso', 409);
        }
    }

    const updateData = { username, email, role };
    if (password && password.trim() !== '') {
        updateData.password = password;
    }

    const updatedUser = User.update(id, updateData);

    res.json({
        success: true,
        message: 'Usuario actualizado exitosamente',
        data: updatedUser
    });
});

// DELETE
export const deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const existingUser = User.findById(id);
    if (!existingUser) {
        throw new AppError('Usuario no encontrado', 404);
    }


    if (req.user.id === parseInt(id)) {
        throw new AppError('No puedes eliminarte a ti mismo', 403);
    }

    User.delete(id);

    res.json({
        success: true,
        message: 'Usuario eliminado correctamente'
    });
});