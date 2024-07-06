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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadBonds = exports.getBondByTicker = exports.updateBonds = exports.getBonds = void 0;
const bonds_json_1 = __importDefault(require("../../utils/bonds.json"));
const complements_1 = require("../../utils/complements");
const client_1 = require("@prisma/client");
const node_cron_1 = __importDefault(require("node-cron"));
const prisma = new client_1.PrismaClient();
const bondsJson = bonds_json_1.default;
const getBonds = () => __awaiter(void 0, void 0, void 0, function* () {
    const bonds = yield prisma.bond.findMany();
    const performedBonds = bonds.map((bond) => {
        const { priceUSD, priceARG } = bond;
        const change = (priceARG / priceUSD).toFixed(2);
        return Object.assign(Object.assign({}, bond), { change });
    });
    return performedBonds;
});
exports.getBonds = getBonds;
const updateBonds = (bonds) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(bonds, 'Separador')
    const updatedBonds = yield prisma.$transaction(bonds.map((bo) => prisma.bond.update({ where: { tickerUSD: bo.tickerUSD }, data: bo })));
    // const updatedBonds = await prisma.bond.update({
    //   where: { tickerUSD: bonds[0].tickerUSD },
    //   data: bonds[0],
    // })
    // console.log(updatedBonds)
    return updatedBonds;
});
exports.updateBonds = updateBonds;
const getBondByTicker = (ticker) => __awaiter(void 0, void 0, void 0, function* () {
    const bond = yield prisma.bond.findUnique({ where: { tickerUSD: ticker } });
    return bond;
});
exports.getBondByTicker = getBondByTicker;
const loadBonds = () => __awaiter(void 0, void 0, void 0, function* () {
    const existingBonds = (yield prisma.bond.findMany({
        select: { tickerUSD: true },
    })).map((item) => item.tickerUSD);
    const filteredBonds = bondsJson.filter((bond) => !existingBonds.includes(bond.tickerUSD));
    const formatedBonds = filteredBonds.map((bond) => {
        const { tickerUSD, tickerARG, dates, amortization, interests, priceUSD, priceARG, currentTir, } = bond;
        const formatedDates = dates.map((date) => {
            const formatedDate = new Date(date);
            return formatedDate;
        });
        const newCashflow = (0, complements_1.setCashflow)(Object.assign(Object.assign({}, bond), { dates: formatedDates }));
        return {
            tickerUSD,
            tickerARG,
            dates: formatedDates,
            amortization,
            interests,
            cashflow: newCashflow,
            priceUSD,
            priceARG,
            currentTir,
        };
    });
    const createBonds = yield prisma.bond.createMany({ data: formatedBonds });
    yield prisma.$disconnect();
    return createBonds;
});
exports.loadBonds = loadBonds;
// cron.schedule('0,30 10-16 * * 1-5', async () => {
node_cron_1.default.schedule('*/1 * * * 1-5', () => __awaiter(void 0, void 0, void 0, function* () {
    const bonds = yield (0, exports.getBonds)();
    const formatedBonds = bonds.map((bond) => {
        const { tickerUSD, tickerARG, dates, amortization, interests, cashflow, priceUSD, priceARG, currentTir, } = bond;
        return {
            tickerUSD,
            tickerARG,
            dates,
            amortization,
            interests,
            cashflow,
            priceUSD,
            priceARG,
            currentTir,
        };
    });
    const updatedPriceBonds = yield (0, complements_1.getCurrentPrice)(formatedBonds);
    // console.log('Hola', updatedPriceBonds)
    if (updatedPriceBonds) {
        const updatedTirBonds = yield (0, complements_1.getTPlusTir)(updatedPriceBonds, 1);
        if (updatedTirBonds) {
            // console.log(updatedTirBonds)
            yield (0, exports.updateBonds)(updatedTirBonds);
        }
    }
    console.log(new Date(), 'Info actualizada');
}));
