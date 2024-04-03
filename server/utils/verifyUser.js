const { errorHandler } = require("./error.js")
const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.access_token

    if (!token) return next(errorHandler(401, 'Unauthorized'))

    jwt.verify(token, 'ascnnvbivbiwegb5654946gerge44', (err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden'))
        req.user = user;
        next();

    })
}