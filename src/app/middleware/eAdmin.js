module.exports = (req, res, next) => {
    const { tipoId } = req;
    if (tipoId != 3) {
        return res.status(401).json({ message: "Rota restrita à administradores" });
    }

    return next();
}