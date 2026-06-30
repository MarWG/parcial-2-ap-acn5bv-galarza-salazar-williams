export default function authAdmin(req, res, next) {
    const isAdmin = req.headers["x-admin"];

    if (isAdmin !== "true") {
        return res.status(401).json({ message: "No autorizado" });
    }

    next();
}
