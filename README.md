
Build and Run the app inside a controlled docker container
```bash
docker-compose up --build -d
```

Run tests
```bash
npm run test
```

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
│ direct   │ 1043.510833        │ 2537112         │ { user: 25084, system: 3771 } │
│ child    │ 172.05262500000003 │ 719000          │ { user: 4915, system: 490 }   │
│ parallel │ 3048.3947080000003 │ 731872          │ { user: 4936, system: 598 }   │
└──────────┴────────────────────┴─────────────────┴───────────────────────────────┘
```