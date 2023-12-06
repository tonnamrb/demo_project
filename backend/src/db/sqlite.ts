// backend/src/db/sqlite.ts

import { Sequelize } from 'sequelize';

// Define database connection
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/sqlite.db', // Path to your SQLite database file
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
