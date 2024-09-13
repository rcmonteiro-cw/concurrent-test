"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// Test concurrent requests to a specific endpoint
async function testConcurrency(endpoint, numRequests) {
    const promises = [];
    for (let i = 0; i < numRequests; i++) {
        promises.push(axios_1.default.get(`http://localhost:3000/${endpoint}`));
    }
    try {
        const responses = await Promise.all(promises);
        responses.forEach((res, index) => {
            console.log(`Response ${index + 1}: Time: ${res.data.timeElapsed}ms / Memory: ${JSON.stringify(res.data.memoryUsage)}`);
        });
    }
    catch (err) {
        console.error("Error during test:", err);
    }
}
// Simulate concurrent requests to '/direct' and '/child'
async function runTests() {
    console.log("Testing with direct call...");
    await testConcurrency('direct', 100);
    //   console.log("Testing with one worker per request child process...");
    //   await testConcurrency('child', 10);
    console.log("Testing with fixed workers parallel child process...");
    await testConcurrency('parallel', 100);
}
runTests();
