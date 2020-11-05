const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json({ message: "Blocked "})

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);
        
        if (!decoded.id || !decoded.idTipo)
            throw new Error();

        req.userId = decoded.id;
        req.idTipo = decoded.idTipo;

        return next();
    } catch (err) {
        return res.status(401).json({message: "Token Invalid"});
    }
}