"use strict";
// backend/src/db/sqlite.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// Define database connection
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: 'db/sqlite.db', // Path to your SQLite database file
});
// Test the database connection
exports.sequelize
    .authenticate()
    .then(() => {
    console.log('Connection to the database has been established successfully.');
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
exports.default = exports.sequelize;
