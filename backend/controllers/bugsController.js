import db from "../database.js";
import { asyncHandler, AppError } from "../middlewares/errorHandler.js";

// GET ALL
export const getBugs = asyncHandler(async (req, res, next) => {
    const query = `
        SELECT
            bugs.*,
            users.username as createdBy,
            users.role as creatorRole
        FROM bugs
                 LEFT JOIN users ON bugs.userId = users.id
        ORDER BY bugs.id DESC
    `;

    const rows = db.prepare(query).all();

    res.json({
        success: true,
        data: rows,
        count: rows.length
    });
});

// GET BY ID
export const getBugById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const query = `
        SELECT
            bugs.*,
            users.username as createdBy,
            users.email as creatorEmail,
            users.role as creatorRole
        FROM bugs
                 LEFT JOIN users ON bugs.userId = users.id
        WHERE bugs.id = ?
    `;

    const bug = db.prepare(query).get(id);

    if (!bug) {
        throw new AppError('Bug no encontrado', 404);
    }

    res.json({
        success: true,
        data: bug
    });
});

// POST (CREATE)
export const createBug = asyncHandler(async (req, res, next) => {
    const { nombreJuego, plataforma, tipo, gravedad, descripcion, imageUrl } = req.body;
    const userId = req.user.id;
    const fecha = new Date().toLocaleString("es-AR");

    const query = db.prepare(`
        INSERT INTO bugs (nombreJuego, plataforma, tipo, gravedad, descripcion, imageUrl, fecha, userId)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = query.run(
        nombreJuego,
        plataforma,
        tipo,
        gravedad,
        descripcion,
        imageUrl || null,
        fecha,
        userId
    );

    const newBugQuery = `
        SELECT
            bugs.*,
            users.username as createdBy,
            users.role as creatorRole
        FROM bugs
                 LEFT JOIN users ON bugs.userId = users.id
        WHERE bugs.id = ?
    `;

    const newBug = db.prepare(newBugQuery).get(result.lastInsertRowid);

    res.status(201).json({
        success: true,
        message: "Bug creado exitosamente",
        data: newBug
    });
});

// PUT (UPDATE)
export const updateBug = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { nombreJuego, plataforma, tipo, gravedad, descripcion, imageUrl } = req.body;

    const existing = db.prepare("SELECT * FROM bugs WHERE id = ?").get(id);

    if (!existing) {
        throw new AppError('Bug no encontrado', 404);
    }


    if (existing.userId !== req.user.id && req.user.role !== 'admin') {
        throw new AppError('No tienes permiso para editar este bug', 403);
    }

    db.prepare(`
        UPDATE bugs
        SET nombreJuego=?, plataforma=?, tipo=?, gravedad=?, descripcion=?, imageUrl=?
        WHERE id=?
    `).run(nombreJuego, plataforma, tipo, gravedad, descripcion, imageUrl || null, id);

    const updatedQuery = `
        SELECT
            bugs.*,
            users.username as createdBy,
            users.role as creatorRole
        FROM bugs
                 LEFT JOIN users ON bugs.userId = users.id
        WHERE bugs.id = ?
    `;

    const updated = db.prepare(updatedQuery).get(id);

    res.json({
        success: true,
        message: "Bug actualizado exitosamente",
        data: updated
    });
});

// DELETE
export const deleteBug = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const existing = db.prepare("SELECT * FROM bugs WHERE id = ?").get(id);

    if (!existing) {
        throw new AppError('Bug no encontrado', 404);
    }


    if (existing.userId !== req.user.id && req.user.role !== 'admin') {
        throw new AppError('No tienes permiso para eliminar este bug', 403);
    }

    db.prepare("DELETE FROM bugs WHERE id = ?").run(id);

    res.json({
        success: true,
        message: "Bug eliminado correctamente"
    });
});

// GET MY BUGS
export const getMyBugs = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const query = `
        SELECT
            bugs.*,
            users.username as createdBy,
            users.role as creatorRole
        FROM bugs
                 LEFT JOIN users ON bugs.userId = users.id
        WHERE bugs.userId = ?
        ORDER BY bugs.id DESC
    `;

    const rows = db.prepare(query).all(userId);

    res.json({
        success: true,
        data: rows,
        count: rows.length
    });
});