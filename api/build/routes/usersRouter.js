"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersHandlers_1 = require("../handlers/usersHandlers");
const usersRouter = (0, express_1.Router)();
usersRouter.get('/', usersHandlers_1.getUsersHandler);
exports.default = usersRouter;
