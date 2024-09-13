"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const perf_hooks_1 = require("perf_hooks");
const endpoints = ['direct', 'child', 'parallel'];
const concurrentCalls = 10;
const testConcurrency = async (endpoint, calls) => {
    const start = perf_hooks_1.performance.now();
    const initialMemoryUsage = process.memoryUsage().heapUsed;
    const initialCpuUsage = process.cpuUsage();
    const requests = Array.from({ length: calls }, () => axios_1.default.get(`http://localhost:3000/${endpoint}`));
    await Promise.all(requests);
    const end = perf_hooks_1.performance.now();
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
    const results = {};
    for (const endpoint of endpoints) {
        console.log(`Testing ${endpoint} with ${concurrentCalls} concurrent calls...`);
        results[endpoint] = await testConcurrency(endpoint, concurrentCalls);
    }
    console.log('Test Results:');
    console.table(results);
};
runTests().catch(console.error);
