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
exports.loadHolidays = exports.getHolidays = void 0;
const client_1 = require("@prisma/client");
const holidays_json_1 = require("../../utils/holidays.json");
const holid = holidays_json_1.holidays;
const prisma = new client_1.PrismaClient();
const getHolidays = () => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const startDate = new Date(date);
    const endDate = new Date(date);
    startDate.setDate(date.getDate() - 5);
    endDate.setDate(date.getDate() + 20);
    const holidays = yield prisma.holiday.findMany({
        where: { date: { gte: startDate, lte: endDate } },
    });
    return holidays.map((item) => item.date);
});
exports.getHolidays = getHolidays;
const loadHolidays = () => __awaiter(void 0, void 0, void 0, function* () {
    const formatedDateHolidays = holid.map((x) => ({ date: new Date(x) }));
    const loadedHolidays = yield prisma.holiday.createMany({
        data: formatedDateHolidays,
    });
    return loadedHolidays;
});
exports.loadHolidays = loadHolidays;
