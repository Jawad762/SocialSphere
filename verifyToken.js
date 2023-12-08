import jwt from "jsonwebtoken";
import { handleError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return next(handleError(401, 'You are not authenticated'))

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(handleError(403, 'Invalid token'))
        req.user = user
        next()
    })
}