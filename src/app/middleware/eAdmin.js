module.exports = (req, res, next) => {
    const { idTipo } = req;
    if (idTipo !== 3) {
        return res.status(401).json({ message: "Rota restrita à administradores" });
    }

    return next();
};