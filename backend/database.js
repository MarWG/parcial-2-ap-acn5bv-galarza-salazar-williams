import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import bcrypt from "bcrypt";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const dbPath = path.join(dataDir, "bugs.db");

const db = new Database(dbPath);

// Tabla de usuarios
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
                                         id INTEGER PRIMARY KEY AUTOINCREMENT,
                                         username TEXT UNIQUE NOT NULL,
                                         email TEXT UNIQUE NOT NULL,
                                         password TEXT NOT NULL,
                                         role TEXT NOT NULL DEFAULT 'tester',
                                         createdAt TEXT NOT NULL,
                                         CONSTRAINT check_role CHECK (role IN ('admin', 'tester'))
        )
`);

// Tabla de bugs
db.exec(`
    CREATE TABLE IF NOT EXISTS bugs (
                                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                                        nombreJuego TEXT NOT NULL,
                                        plataforma TEXT NOT NULL,
                                        tipo TEXT NOT NULL,
                                        gravedad TEXT NOT NULL,
                                        descripcion TEXT NOT NULL,
                                        imageUrl TEXT,
                                        fecha TEXT NOT NULL,
                                        userId INTEGER,
                                        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL
        )
`);

try {
    db.exec(`ALTER TABLE bugs ADD COLUMN imageUrl TEXT`);
    console.log('✅ Columna imageUrl agregada a la tabla bugs');
} catch (error) {
    if (!error.message.includes('duplicate column name')) {
        console.error('Error al agregar columna imageUrl:', error);
    }
}

db.exec(`
    CREATE INDEX IF NOT EXISTS idx_bugs_userId ON bugs(userId);
    CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
`);

// Crear usuarios por defecto
const checkAdmin = db.prepare("SELECT * FROM users WHERE username = ?").get('admin');
const checkTester = db.prepare("SELECT * FROM users WHERE username = ?").get('tester');

if (!checkAdmin) {
    const hashedPasswordAdmin = bcrypt.hashSync('1234', 10);
    db.prepare(`
        INSERT INTO users (username, email, password, role, createdAt)
        VALUES (?, ?, ?, ?, ?)
    `).run('admin', 'admin@buglog.com', hashedPasswordAdmin, 'admin', new Date().toISOString());
    console.log('✅ Usuario admin creado correctamente');
}

if (!checkTester) {
    const hashedPasswordTester = bcrypt.hashSync('1234', 10);
    db.prepare(`
        INSERT INTO users (username, email, password, role, createdAt)
        VALUES (?, ?, ?, ?, ?)
    `).run('tester', 'tester@buglog.com', hashedPasswordTester, 'tester', new Date().toISOString());
    console.log('✅ Usuario tester creado correctamente');
}

console.log('✅ Base de datos iniciada correctamente.');
console.log('Usuarios: admin (1234), tester (1234)');

export default db;