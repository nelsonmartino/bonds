"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const holidaysHandlers_1 = require("../handlers/holidaysHandlers");
const holidaysRouter = (0, express_1.Router)();
holidaysRouter.get('/', holidaysHandlers_1.getHolidaysHandler);
holidaysRouter.get('/load', holidaysHandlers_1.loadHolidaysHandler);
exports.default = holidaysRouter;
