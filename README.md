
Build and Run the app inside a controlled docker container
```bash
docker build -t my-node-app .
docker run --name my-node-app-container -p 3000:3000 --cpus="4.0" --memory="512m" my-node-app
```

Run tests
```bash
npm run test
```

You can change the `concurrentCalls` to create a more aggressive experiment, but since we are using an external resource, they have their ratelimits.

```bash
> concurrent-test@1.0.0 test
> ts-node src/test.ts

Testing direct with 10 concurrent calls...
Testing child with 10 concurrent calls...
Testing parallel with 10 concurrent calls...
Test Results:

┌──────────┬────────────────────┬─────────────────┬───────────────────────────────┐
│ (index)  │ totalTimeElapsed   │ totalMemoryUsed │ cpuUsage                      │
├──────────┼────────────────────┼─────────────────┼───────────────────────────────┤
│ direct   │ 122.32745900000003 │ 2475832         │ { user: 17291, system: 2716 } │
│ child    │ 311.340583         │ 719056          │ { user: 3573, system: 385 }   │
│ parallel │ 226.03416600000003 │ 1286160         │ { user: 3252, system: 284 }   │
└──────────┴────────────────────┴─────────────────┴───────────────────────────────┘
```