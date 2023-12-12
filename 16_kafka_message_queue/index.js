import { sendMessageToQueue } from "./producer.js";
import { consumeMessage } from "./message-queue.js";

// Sending 5 messages to queue
for (let i = 1; i <= 5; i++) {
    if ((i % 2) === 0) {
        const message = 'Hello Test Even Message: ' + i + ' From the Producer!';
        await sendMessageToQueue(message);
    } else {
        const message = 'Hello Test Odd Message: ' + i + ' From the Producer!';
        await sendMessageToQueue(message);
    }
}

let arr = ['hello', 'world', 'from', 'indexJS', 'file']
console.log('Original Array: ', arr);

for (let i=0; i<arr.length; i++) {
    console.log(`arr[i] :- ${arr[i]}`)
    const message = Buffer.from(arr[i])
    console.log(`message :- ${message}`)
    await sendMessageToQueue(message)
}

// Consuming the sent messages
await consumeMessage();
