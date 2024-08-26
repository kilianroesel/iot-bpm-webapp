import express from 'express';
import { producer } from './config/kafkaClient';
import validateSchema from './middleware/schemaValidation';
import db from './config/mongoose';

const apiRouter = express.Router();

// apiRouter.post('/updateRule', async (req, res) => {
//   const { topic, message } = req.body;

//   try {
//     await producer.send({
//       topic,
//       messages: [{ value: message }],
//     });
//     res.status(200).send('Message produced successfully');
//   } catch (error) {
//     console.error('Error producing message', error);
//     res.status(500).send('Error producing message');
//   }
// });

apiRouter.get('/eventAbstractionRules', async (req, res) => {
  
  res.send("hu");
});

apiRouter.post('/domainModels', validateSchema("createScope"), async (req, res) => {
  const body = req.body;
  res.send(body);
});

export default apiRouter;