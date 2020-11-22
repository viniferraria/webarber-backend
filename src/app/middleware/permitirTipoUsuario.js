module.exports = (id) => {
    let message;
    switch (id) {
        case 1:
            message = "usuários";
            break;
        case 2:
            message = "moderadores";
            break;
        case 3:
            message = "admins";
            break;
    }
    return (req, res, next) => {
        const { idTipo } = req;
        if (idTipo !== id) {
            return res.status(401).json({ message: `Rota restrita à ${message}` });
        }

        return next();
    }
};