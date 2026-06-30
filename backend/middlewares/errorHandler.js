export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

// Middleware para rutas no encontradas
export const notFound = (req, res, next) => {
    const error = new AppError(
        `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
        404
    );
    next(error);
};

// Middleware principal de manejo de errores
export const errorHandler = (err, req, res, next) => {
    // Establecer código de estado por defecto
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';


    const isDevelopment = process.env.NODE_ENV === 'development';


    const errorResponse = {
        success: false,
        status: err.status,
        message: err.message || 'Error interno del servidor'
    };


    if (isDevelopment) {
        errorResponse.error = err;
        errorResponse.stack = err.stack;
    }


    if (err.code === 'SQLITE_CONSTRAINT') {
        err.statusCode = 400;

        if (err.message.includes('UNIQUE constraint failed: users.username')) {
            errorResponse.message = 'El nombre de usuario ya está en uso';
        } else if (err.message.includes('UNIQUE constraint failed: users.email')) {
            errorResponse.message = 'El email ya está registrado';
        } else {
            errorResponse.message = 'Error de restricción en la base de datos';
        }
    }

    // Errores de validación de express-validator
    if (err.errors && Array.isArray(err.errors)) {
        err.statusCode = 400;
        errorResponse.message = 'Errores de validación';
        errorResponse.errors = err.errors;
    }

    // Errores de JWT
    if (err.name === 'JsonWebTokenError') {
        err.statusCode = 401;
        errorResponse.message = 'Token inválido';
    }

    if (err.name === 'TokenExpiredError') {
        err.statusCode = 401;
        errorResponse.message = 'Token expirado';
    }

    // Errores de bcrypt
    if (err.name === 'BcryptError') {
        err.statusCode = 500;
        errorResponse.message = 'Error en el procesamiento de contraseñas';
    }


    if (isDevelopment || err.statusCode >= 500) {
        console.error(' ERROR:', {
            message: err.message,
            statusCode: err.statusCode,
            stack: err.stack,
            path: req.path,
            method: req.method
        });
    }


    res.status(err.statusCode).json(errorResponse);
};


export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};