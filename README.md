
Build and Run the app inside a controlled docker container
```bash
docker build -t my-node-app .
docker run --name my-node-app-container -p 3000:3000 --cpus="1.0" --memory="512m" my-node-app
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
┌──────────┬───────────────────┬─────────────────┬───────────────────────────────┐
│ (index)  │ totalTimeElapsed  │ totalMemoryUsed │ cpuUsage                      │
├──────────┼───────────────────┼─────────────────┼───────────────────────────────┤
│ direct   │ 937.968167        │ 2514832         │ { user: 20452, system: 3091 } │
│ child    │ 276.5162500000001 │ 718872          │ { user: 5432, system: 703 }   │
│ parallel │ 439.235625        │ 686968          │ { user: 2686, system: 222 }   │
└──────────┴───────────────────┴─────────────────┴───────────────────────────────┘
```