const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    // Master process
    console.log(`Master ${process.pid} is running`);

    // Fork workers equal to the number of CPU cores
    const numCPUs = os.cpus().length;
    console.log('numCPUs :- ', numCPUs)
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Handle the exit event for workers
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        // Fork a new worker if one exits
        cluster.fork();
    });
} else {
    // Worker process
    console.log(`Worker ${process.pid} started`);

    // Your application logic goes here
    // For example, you can create an HTTP server in each worker
    const http = require('http');
    const server = http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Hello World\n');
    });

    server.listen(3000, () => {
        console.log(`Worker ${process.pid} listening on port 3000`);
    });
}
