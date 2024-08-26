import express from 'express';
import { producer } from './config/kafkaClient';

const router = express.Router();

router.post('/updateRule', async (req, res) => {
  const { topic, message } = req.body;

  try {
    await producer.send({
      topic,
      messages: [{ value: message }],
    });
    res.status(200).send('Message produced successfully');
  } catch (error) {
    console.error('Error producing message', error);
    res.status(500).send('Error producing message');
  }
});

export default router;