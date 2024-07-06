"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersHandler = void 0;
const usersControllers_1 = require("../controllers/usersControllers");
const getUsersHandler = (req, res) => {
    const { email } = req.query;
    if (email) {
        const user = (0, usersControllers_1.getUserByEmail)(email);
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(400).json({ message: 'User not found' });
    }
    const users = (0, usersControllers_1.getUsers)();
    res.status(200).json(users);
};
exports.getUsersHandler = getUsersHandler;
