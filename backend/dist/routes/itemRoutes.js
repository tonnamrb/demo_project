"use strict";
// src/routes/itemRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const itemController_1 = require("../controllers/itemController");
const router = express_1.default.Router();
// GET all items
router.get('/items', itemController_1.getAllItems);
// Implement other CRUD routes as needed.
exports.default = router;
