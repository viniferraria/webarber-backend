module.exports = async (req, res, next) => {
    const { tipoId } = req;
<<<<<<< HEAD
    if (tipoId != 3)
=======
    if (!tipoId || tipoId != 2)
>>>>>>> 72d81f10568586f42ce3983b170ac2640989cabb
        return res.status(401).json({ message: "Blocked "})

    return next();
}