import express from 'express';
import axios from 'axios';
import { fork } from 'child_process';
import path from 'path';
import { performance } from 'perf_hooks';
import { memoryUsage } from 'process';
import workerpool from 'workerpool';
import { heavyTask } from './task';

// Create a pool with fixed number of workers
// It's very heavy to create a new worker for each _request
const pool = workerpool.pool(__dirname + '/../dist/worker.js', {
    maxWorkers: 4, // Based on system's available CPU cores
    workerType: 'thread',
});

// Using child_process
const heavyTaskWithChildProcess = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
        const child = fork(path.join(__dirname + '/../dist/worker.js'));
        child.on('message', (message) => {
            resolve(message);
        });
        child.on('error', (error) => {
            reject(error);
        });
    });
};

const app = express();
const port = 3000;

app.get('/parallel', async (_req, res) => {
    try {
        const start = performance.now();
        const result = await pool.exec('performHeavyTask', []); 
        const end = performance.now();
        res.json({
            timeElapsed: end - start,
            memoryUsage: memoryUsage(),
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error in parallel call' });
      }
});

// Endpoint using direct call
app.get('/direct', async (_req, res) => {
    const start = performance.now();
    try {
        const data = await heavyTask();
        const end = performance.now();
        res.json({
            timeElapsed: end - start,
            memoryUsage: memoryUsage()
        });
    } catch (error) {
        res.status(500).json({ error: 'Error in direct call!' });
    }
});

// Endpoint using child_process
app.get('/child', async (_req, res) => {
    const start = performance.now();
    try {
        const data = await heavyTaskWithChildProcess();
        const end = performance.now();
        res.json({
            timeElapsed: end - start,
            memoryUsage: memoryUsage()
        });
    } catch (error) {
        res.status(500).json({ error: 'Error in child call' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});