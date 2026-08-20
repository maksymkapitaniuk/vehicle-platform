import 'dotenv/config';
import express from 'express';
import vehiclesRouter from './vehicles/routes.js';

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use('/vehicles', vehiclesRouter);

app.use((err, req, res, _next) => {
  res.status(500);
  res.json(err);
});

app.listen(port, () => console.log(`Server is listening at ${port}`));
