import { Worker } from "bullmq";
const worker = new Worker('Paint', async (job) => {
    console.log(job.data);
    console.log('processing');
}, {
    connection: {
        host: 'redis',
    }
});

worker.on('completed', (job) => {
    // console.log(job.returnvalue);
    console.log('completed');
});

worker.on('failed', (job, err) => {
    console.log(job);
    console.log(err);
    console.log('failed');
});

const shutdown = () => {
    console.log('Stopping worker...');
    worker.close();
    worker.disconnect();
    process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);