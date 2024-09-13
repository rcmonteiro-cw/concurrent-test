
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