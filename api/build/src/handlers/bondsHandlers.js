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
exports.loadBondsHandler = exports.getBondsHandler = void 0;
const bondsControllers_1 = require("../controllers/bondsControllers");
const getBondsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticker } = req.query;
        if (ticker) {
            const bond = yield (0, bondsControllers_1.getBondByTicker)(ticker);
            if (bond) {
                return res.status(200).json(bond);
            }
            return res.status(400).send('Bond not found');
        }
        const bonds = yield (0, bondsControllers_1.getBonds)();
        res.status(200).json(bonds);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getBondsHandler = getBondsHandler;
const loadBondsHandler = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createBonds = yield (0, bondsControllers_1.loadBonds)();
        res.status(200).json(createBonds);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.loadBondsHandler = loadBondsHandler;
