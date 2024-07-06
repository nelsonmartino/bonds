"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRouter_1 = __importDefault(require("./usersRouter"));
const bondsRouter_1 = __importDefault(require("./bondsRouter"));
const holidaysRouter_1 = __importDefault(require("./holidaysRouter"));
const routes = (0, express_1.Router)();
routes.use('/users', usersRouter_1.default);
routes.use('/bonds', bondsRouter_1.default);
routes.use('/holidays', holidaysRouter_1.default);
exports.default = routes;
