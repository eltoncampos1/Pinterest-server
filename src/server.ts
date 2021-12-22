import 'reflect-metadata';
import 'dotenv/config';
import './infra/database';
import './shared/container';
import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';
import { AppError } from './shared/errors/errors';

const { PORT } = process.env;

const app = express();
app.use(express.json());

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'Error',
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(PORT, () => console.log(`app is running on::${PORT}`));
