"use strict";
// src/app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3 = require('sqlite3').verbose();
const express_1 = __importDefault(require("express"));
const itemRoutes_1 = __importDefault(require("./routes/itemRoutes"));
const sqlite_1 = require("./db/sqlite");
const dotenv_1 = __importDefault(require("dotenv"));
const cors = require('cors'); // Import the cors middleware
const fs = require('fs');
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express_1.default.json());
app.use('/api', itemRoutes_1.default);

sqlite_1.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

const db = new sqlite3.Database('./db/myOrder.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT)');
});

app.get('/api/exportDatabase', (req, res) => {
    db.all('SELECT * FROM items', (err, rows) => {
      if (err) {
        console.error('Error fetching items:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      const data = JSON.stringify(rows, null, 2);
      fs.writeFileSync('./exportedDatabase.json', data);
  
      res.json({ message: 'Database exported to file' });
    });
  });

app.post('/api/createItem', (req, res) => {
    const { name, description } = req.body;
  
    console.log('Received data:', name, description); // Log to check if the data is correct
  
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }
  
    const stmt = db.prepare('INSERT INTO items (name, description) VALUES (?, ?)');
    stmt.run(name, description, function (err) {
      if (err) {
        console.error('Error inserting item:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      const itemId = this.lastID;
      console.log('Inserted item with ID:', itemId);
      res.status(201).json({ id: itemId, name, description });
    });
  
    stmt.finalize();
  });

  app.get('/api/allItems', (req, res) => {
    db.all('SELECT * FROM items', (err, rows) => {
      if (err) {
        console.error('Error fetching items:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      res.json(rows);
    });
  });

  app.get('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
  
    db.get('SELECT * FROM items WHERE id = ?', [itemId], (err, row) => {
      if (err) {
        console.error('Error fetching item:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (!row) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      res.json(row);
    });
  });
  
  app.put('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    const { name, description } = req.body;
  
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }
  
    db.run('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, itemId], function (err) {
      if (err) {
        console.error('Error updating item:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      console.log('Item updated successfully:', this.changes);
      res.json({ id: itemId, name, description });
    });

    app.delete('/api/items/:id', (req, res) => {
        const itemId = req.params.id;
      
        db.run('DELETE FROM items WHERE id = ?', [itemId], function (err) {
          if (err) {
            console.error('Error deleting item:', err);
            return res.status(500).json({ error: 'Internal server error' });
          }
      
          if (this.changes === 0) {
           
            return res.status(404).json({ error: 'Item not found' });
          }
      
          console.log('Item deleted successfully:', this.changes);
          res.json({ id: itemId });
        });
      });
      
  });