import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import vehiclesRouter from './vehicles/routes.js';
import errorHandler from './common/middleware/error-handler.js';

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

app.use(errorHandler);

app.listen(port, () => console.log(`Server is listening at ${port}`));
