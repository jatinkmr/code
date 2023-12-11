import { sendMessageToQueue } from "./producer.js";
import { consumeMessage } from "./message-queue.js";

// Sending 10 messages to queue
for (let i = 1; i <= 5; i++) {
    if ((i%2) === 0) {
        const message = 'Hello Test Even Message: ' + i + ' From the Producer!';
        await sendMessageToQueue(message);
    } else {
        const message = 'Hello Test Odd Message: ' + i + ' From the Producer!';
        await sendMessageToQueue(message);
    }
}

// Consuming the sent messages
await consumeMessage();
