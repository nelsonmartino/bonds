"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.getUsers = void 0;
const users_json_1 = __importDefault(require("../../utils/users.json"));
const users = users_json_1.default;
const getUsers = () => users;
exports.getUsers = getUsers;
const getUserByEmail = (email) => {
    return users.find((user) => user.email === email);
};
exports.getUserByEmail = getUserByEmail;
