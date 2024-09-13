import axios from 'axios';
import { performance } from 'perf_hooks';

const endpoints = ['direct', 'child', 'parallel'];
const concurrentCalls = 10;

interface Metrics {
    totalTimeElapsed: number;
    totalMemoryUsed: number;
    cpuUsage: NodeJS.CpuUsage;
}

const testConcurrency = async (endpoint: string, calls: number): Promise<Metrics> => {
    const start = performance.now();
    const initialMemoryUsage = process.memoryUsage().heapUsed;
    const initialCpuUsage = process.cpuUsage();

    const requests = Array.from({ length: calls }, () => axios.get(`http://localhost:3000/${endpoint}`));
    await Promise.all(requests);

    const end = performance.now();
    const finalMemoryUsage = process.memoryUsage().heapUsed;
    const finalCpuUsage = process.cpuUsage();

    return {
        totalTimeElapsed: end - start,
        totalMemoryUsed: finalMemoryUsage - initialMemoryUsage,
        cpuUsage: {
            user: finalCpuUsage.user - initialCpuUsage.user,
            system: finalCpuUsage.system - initialCpuUsage.system,
        },
    };
};

const runTests = async () => {
    const results: { [key: string]: Metrics } = {};

    for (const endpoint of endpoints) {
        console.log(`Testing ${endpoint} with ${concurrentCalls} concurrent calls...`);
        results[endpoint] = await testConcurrency(endpoint, concurrentCalls);
    }

    console.log('Test Results:');
    console.table(results);
};

runTests().catch(console.error);