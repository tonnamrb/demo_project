// src/app.ts

import express from 'express';
import itemRoutes from './routes/itemRoutes';
import { sequelize } from './db/sqlite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', itemRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
