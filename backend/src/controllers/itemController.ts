// src/controllers/itemController.ts

import { Request, Response } from 'express';
import Item from '../models/itemModel';

export const getAllItems = async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Implement other CRUD operations (create, update, delete) as needed.
