import express from "express";
import {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/usersController.js";
import { verifyToken, verifyAdmin } from "../middlewares/authMiddleware.js";
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Validaciones
const userValidation = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 3 })
        .withMessage('El nombre de usuario debe tener al menos 3 caracteres'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('El email es obligatorio')
        .isEmail()
        .withMessage('Debe ser un email válido'),

    body('password')
        .optional({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('La contraseña debe tener al menos 4 caracteres'),

    body('role')
        .notEmpty()
        .withMessage('El rol es obligatorio')
        .isIn(['admin', 'tester'])
        .withMessage('El rol debe ser admin o tester')
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Errores de validación',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

// Todas las rutas requieren admin
router.use(verifyToken);
router.use(verifyAdmin);

router.get("/", getAllUsers);
router.post("/", userValidation, handleValidationErrors, createUser);
router.put("/:id", userValidation, handleValidationErrors, updateUser);
router.delete("/:id", deleteUser);

export default router;