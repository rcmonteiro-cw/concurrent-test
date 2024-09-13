"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.performHeavyTask = void 0;
const axios_1 = __importDefault(require("axios"));
const workerpool_1 = __importDefault(require("workerpool"));
// Simulate heavy operation inside a child process
console.log('Worker default started');
const performHeavyTask = async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const result = await axios_1.default.get(url);
    process.send?.(result.data);
};
exports.performHeavyTask = performHeavyTask;
performHeavyTask().catch(err => {
    console.log("worker error", err);
    process.send?.({ error: 'Error in the worker' });
});
workerpool_1.default.worker({
    performHeavyTask: performHeavyTask
});
