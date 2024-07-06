"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadHolidaysHandler = exports.getHolidaysHandler = void 0;
const holidaysControllers_1 = require("../controllers/holidaysControllers");
const getHolidaysHandler = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const holidays = yield (0, holidaysControllers_1.getHolidays)();
        res.status(200).json(holidays);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getHolidaysHandler = getHolidaysHandler;
const loadHolidaysHandler = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loadedHolidays = yield (0, holidaysControllers_1.loadHolidays)();
        res.status(200).json(loadedHolidays);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.loadHolidaysHandler = loadHolidaysHandler;
