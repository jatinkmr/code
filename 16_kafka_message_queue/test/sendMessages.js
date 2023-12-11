import { sendMessageToQueue } from "../producer.js";

// Tip: To Send Object send them as string and parse while consuming

// Sending 10 messages to queue
for (let i = 1; i <= 10; i++) {
  const message = 'Hello Test Message: ' + i + ' From the send Message Queue';
  await sendMessageToQueue(message);
}
