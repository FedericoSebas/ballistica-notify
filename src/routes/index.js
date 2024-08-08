import { Router } from "express";
import webpush from "../webpush.js";

const router = Router();


let subscriptions = [];
let sseClients = [];


router.post('/data', async (req, res) => {
  const message = req.body.data;

  console.log(JSON.stringify(message))


  // Notify all connected clients
  
  sseClients.forEach(client => client.res.write('Data recieved'));

  // Send push notifications to all subscribers
  const payload = JSON.stringify({
    title: 'My Custom Notification',
    message
  });

  const results = await Promise.all(subscriptions.map(subscription => {
    return webpush.sendNotification(subscription, payload)
      .then(() => ({ subscription, success: true }))
      .catch(error => {
        if (error.statusCode === 410) {
          console.error('Subscription has expired or is no longer valid:', error);
          return { subscription, success: false };
        } else {
          console.error('Error sending notification:', error);
          return { subscription, success: true };
        }
      });
  }));

  // Filter out invalid subscriptions
  subscriptions = results.filter(result => result.success).map(result => result.subscription);

  res.status(200).send('Data received successfully!\n');
});

router.post('/subscription', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(200).send('Subscription received successfully!\n');
});


router.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  sseClients.push({ req, res });

  req.on('close', () => {
    sseClients = sseClients.filter(client => client.req !== req);
  });
});

export default router;