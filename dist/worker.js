"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const workerpool_1 = __importDefault(require("workerpool"));
const task_1 = require("./task");
workerpool_1.default.worker({
    performHeavyTask: task_1.heavyTask
});
