import express from "express";
import cors from "cors";
import bugsRouter from "./routes/bugs.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";  // ← NUEVO
import logger from "./middlewares/logger.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

// Rutas
app.use("/api/bugs", bugsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);  // ← NUEVO

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Servidor Express corriendo en http://localhost:${PORT}`);
});