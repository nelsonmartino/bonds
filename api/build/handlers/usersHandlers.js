"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersHandler = void 0;
const getUsersHandler = (_req, res) => {
    res.status(200).send('Información de todos los usuarios');
};
exports.getUsersHandler = getUsersHandler;
