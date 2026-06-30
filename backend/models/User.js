import db from "../database.js";
import bcrypt from "bcrypt";

class User {
    static create({ username, email, password, role = 'tester' }) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const createdAt = new Date().toISOString();

        const query = db.prepare(`
            INSERT INTO users (username, email, password, role, createdAt)
            VALUES (?, ?, ?, ?, ?)
        `);

        try {
            const result = query.run(username, email, hashedPassword, role, createdAt);
            return {
                id: result.lastInsertRowid,
                username,
                email,
                role,
                createdAt
            };
        } catch (error) {
            if (error.message.includes('UNIQUE constraint failed: users.username')) {
                throw new Error('El nombre de usuario ya está en uso');
            }
            if (error.message.includes('UNIQUE constraint failed: users.email')) {
                throw new Error('El email ya está registrado');
            }
            throw error;
        }
    }

    static findByUsername(username) {
        const query = db.prepare("SELECT * FROM users WHERE username = ?");
        return query.get(username);
    }

    static findByEmail(email) {
        const query = db.prepare("SELECT * FROM users WHERE email = ?");
        return query.get(email);
    }

    static findById(id) {
        const query = db.prepare("SELECT id, username, email, role, createdAt FROM users WHERE id = ?");
        return query.get(id);
    }


    static getAll() {
        const query = db.prepare("SELECT id, username, email, role, createdAt FROM users ORDER BY id ASC");
        return query.all();
    }


    static update(id, { username, email, password, role }) {
        let query;
        let params;

        if (password) {
            const hashedPassword = bcrypt.hashSync(password, 10);
            query = db.prepare(`
                UPDATE users
                SET username = ?, email = ?, password = ?, role = ?
                WHERE id = ?
            `);
            params = [username, email, hashedPassword, role, id];
        } else {
            query = db.prepare(`
                UPDATE users
                SET username = ?, email = ?, role = ?
                WHERE id = ?
            `);
            params = [username, email, role, id];
        }

        try {
            const result = query.run(...params);

            if (result.changes === 0) {
                throw new Error('Usuario no encontrado');
            }

            return this.findById(id);
        } catch (error) {
            throw new Error('Error al actualizar el usuario: ' + error.message);
        }
    }

    static delete(id) {
        const query = db.prepare("DELETE FROM users WHERE id = ?");

        try {
            const result = query.run(id);

            if (result.changes === 0) {
                throw new Error('Usuario no encontrado');
            }

            return { success: true, id };
        } catch (error) {
            throw new Error('Error al eliminar el usuario: ' + error.message);
        }
    }

    static exists(username) {
        const query = db.prepare("SELECT COUNT(*) as count FROM users WHERE username = ?");
        const result = query.get(username);
        return result.count > 0;
    }
}

export default User;