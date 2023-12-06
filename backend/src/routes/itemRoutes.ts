// src/routes/itemRoutes.ts

import express from 'express';
import { getAllItems } from '../controllers/itemController';

const router = express.Router();

// GET all items
router.get('/items', getAllItems);

// Implement other CRUD routes as needed.

export default router;
