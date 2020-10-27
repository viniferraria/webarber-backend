module.exports = async (req, res, next) => {
    const { tipoId } = req;
    if (!tipoId || tipoId != 2)
        return res.status(401).json({ message: "Blocked "})

    return next();
}