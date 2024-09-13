import express from 'express';
import { performance } from 'perf_hooks';

const app = express();
const port = 4000;

app.get('/heavy-task', (_req, res) => {
    const start = performance.now();
    // Simulate a heavy task with a delay
    setTimeout(() => {
        const end = performance.now();
        res.json({
            message: 'Heavy task completed',
            timeElapsed: end - start
        });
    }, 1000); // Simulate a 1-second heavy task
});

app.listen(port, () => {
    console.log(`Local resource server running on port ${port}`);
});