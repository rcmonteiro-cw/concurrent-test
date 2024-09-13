"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.performHeavyTask = void 0;
const axios_1 = __importDefault(require("axios"));
// The heavy operation to be performed by the worker
console.log('Worker started');
const performHeavyTask = async () => {
    console.log('Inside worker task...');
    try {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const result = await axios_1.default.get(url);
        return result.data;
    }
    catch (error) {
        console.error('Error in worker:', error);
        throw error;
    }
};
exports.performHeavyTask = performHeavyTask;
