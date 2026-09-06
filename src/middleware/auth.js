import jwt from "jsonwebtoken"
import userModel from "../../DB/models/user.model.js";

export const auth = (accessRoles = []) => {
    return async (req, res, next) => {
        const token = req.headers.token;

        if (!token) {
            return res.status(400).json({ message: "invalid auth" })
        }

        const decoded = jwt.verify(token, process.env.LOGIN_SIGNAL)

        const user = await userModel.findById(decoded.id)

        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }

        if (!accessRoles.includes(user.role)) {
            return res.status(403).json({ message: "not authorized" })
        }

        req.id = decoded.id;
        next()
    }
}