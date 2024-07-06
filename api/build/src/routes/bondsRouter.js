"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bondsHandlers_1 = require("../handlers/bondsHandlers");
const bondsRouter = (0, express_1.Router)();
bondsRouter.get('/', bondsHandlers_1.getBondsHandler);
bondsRouter.get('/load', bondsHandlers_1.loadBondsHandler);
exports.default = bondsRouter;
