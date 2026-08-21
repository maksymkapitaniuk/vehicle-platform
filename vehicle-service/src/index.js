import 'dotenv/config';
import express from 'express';
import vehiclesRouter from './vehicles/routes.js';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

const port = process.env.PORT ?? 3000;

const clientUrl = process.env.CLIENT_URL ?? 'http://localhost:5173';
const corsOptions = {
  origin: clientUrl,
  credentials: true,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.use('/vehicles', vehiclesRouter);

app.use((err, req, res, _next) => {
  res.status(500);
  res.json(err);
});

app.listen(port, () => console.log(`Server is listening at ${port}`));
