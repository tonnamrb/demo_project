"use strict";
// src/controllers/itemController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllItems = void 0;
const itemModel_1 = __importDefault(require("../models/itemModel"));
const getAllItems = async (_req, res) => {
    try {
        const items = await itemModel_1.default.findAll();
        res.status(200).json(items);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
exports.getAllItems = getAllItems;
// Implement other CRUD operations (create, update, delete) as needed.
