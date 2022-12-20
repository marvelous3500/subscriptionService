import cors  from 'cors';
import express from 'express';
import morgan from'morgan';

require("dotenv").config();

import planRouter from './api/router/planRouter'
import  subscriptionRouter from './api/router/subscriptionRouter'

const bodyParser = require ('body-parser');


const port = process.env.PORT || 3000;

const app = express();

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    limit: "10mb",
    extended: false,
    parameterLimit: 10000,
  })
);

// Enable cors
app.use(cors());
app.use(morgan("common"));

app.use(bodyParser.json({ type: 'application/json' }));
app.get('/api/', (req, res) => res.send('Welcome to subscription service'));
app.use('/api/plan',planRouter);
app.use('/api/subscription', subscriptionRouter);



//listening to port
app.listen(port, () => {
  console.log(`Welcome to subscription service running on port ${port}`);
});


// sudo docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh \
//     --create \
//     --bootstrap-server localhost:9092 \
//     --replication-factor 1 \
//     --partitions 1 \
//     --topic test

// install avsc 