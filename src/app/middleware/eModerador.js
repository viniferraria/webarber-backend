module.exports = (req, res, next) => {
    const { idTipo } = req;
    if (idTipo != 2)
        return res.status(401).json({ message: "Blocked"})

    return next();
}