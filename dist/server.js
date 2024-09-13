"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const perf_hooks_1 = require("perf_hooks");
const process_1 = require("process");
const workerpool_1 = __importDefault(require("workerpool"));
const task_1 = require("./task");
// Create a pool with fixed number of workers
// It's very heavy to create a new worker for each _request
const pool = workerpool_1.default.pool(__dirname + '/../dist/worker.js', {
    maxWorkers: 8, // Based on system's available CPU cores
    workerType: 'thread',
});
// Using child_process
const heavyTaskWithChildProcess = async () => {
    return new Promise((resolve, reject) => {
        const child = (0, child_process_1.fork)(path_1.default.join(__dirname, 'worker.ts'));
        child.on('message', (message) => {
            resolve(message);
        });
        child.on('error', (error) => {
            reject(error);
        });
    });
};
const app = (0, express_1.default)();
const port = 3000;
app.get('/parallel', async (_req, res) => {
    try {
        const start = perf_hooks_1.performance.now();
        const result = await pool.exec('performHeavyTask', []);
        const end = perf_hooks_1.performance.now();
        res.json({
            timeElapsed: end - start,
            memoryUsage: (0, process_1.memoryUsage)(),
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error in parallel call' });
    }
});
// Endpoint using direct call
app.get('/direct', async (_req, res) => {
    const start = perf_hooks_1.performance.now();
    try {
        const data = await (0, task_1.heavyTask)();
        const end = perf_hooks_1.performance.now();
        res.json({
            timeElapsed: end - start,
            memoryUsage: (0, process_1.memoryUsage)()
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Error in direct call!' });
    }
});
// Endpoint using child_process
app.get('/child', async (_req, res) => {
    const start = perf_hooks_1.performance.now();
    try {
        const data = await heavyTaskWithChildProcess();
        const end = perf_hooks_1.performance.now();
        res.json({
            timeElapsed: end - start,
            memoryUsage: (0, process_1.memoryUsage)()
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Error in child call' });
    }
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
