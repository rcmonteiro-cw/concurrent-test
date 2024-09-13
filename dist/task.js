"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.heavyTask = void 0;
const axios_1 = __importDefault(require("axios"));
const heavyTask = async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const result = await axios_1.default.get(url);
    return result.data;
};
exports.heavyTask = heavyTask;
