import sqlite3 from 'sqlite3';

// Create a new database
const db = new sqlite3.Database("mydb.db");

// Define a schema for the users table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )
`);
db.run(`
  CREATE TABLE IF NOT EXISTS favorite (
    key TEXT PRIMARY KEY NOT NULL UNIQUE,
    userid INTEGER NOT NULL,
    slug TEXT NOT NULL,
    name TEXT NOT NULL,
    thumb_url TEXT
  )
`);
db.run(`
  CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userid INTEGER NOT NULL,
    slug_phim TEXT NOT NULL,
    slug_tap TEXT NOT NULL
  )
`);
// db.run(`
//   CREATE TABLE IF NOT EXISTS history (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     userid INTEGER NOT NULL,
//     slugP TEXT NOT NULL,
//     slugEP TEXT NOT NULL,
//     time DATETIME
//   )
// `);
//db.run('DROP DATABASE mydb.db')
// // Insert initial data into the users table
db.run(`
  INSERT INTO users (name, password) VALUES ('toan', '1234')
`, (err) => {
    if (err) {
        console.error('Error inserting data:', err);
    } else {
        console.log('Initial data inserted successfully.');
    }
});

// Close the database connection
// Note: Since this file is not meant to be executed directly as a script, you may not need to close the database connection here.
// If you need to use this module in other files, you should keep the connection open.
// db.close();

export { db }; // Named export