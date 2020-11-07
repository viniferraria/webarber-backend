module.exports = (req, res, next) => {
    const { tipoId } = req;
    if (tipoId != 3)
        return res.status(401).json({ message: "Blocked "})

    return next();
}