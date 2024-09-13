"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const perf_hooks_1 = require("perf_hooks");
const app = (0, express_1.default)();
const port = 4000;
app.get('/heavy-task', (_req, res) => {
    const start = perf_hooks_1.performance.now();
    // Simulate a heavy task with a delay
    setTimeout(() => {
        const end = perf_hooks_1.performance.now();
        res.json({
            message: 'Heavy task completed',
            timeElapsed: end - start
        });
    }, 2000); // Simulate a 2-second heavy task
});
app.listen(port, () => {
    console.log(`Local resource server running on port ${port}`);
});
