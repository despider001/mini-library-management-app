import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

const initDBScriptPath = path.resolve(__dirname, '../../init_db.sql');
const initDBScript = fs.readFileSync(initDBScriptPath, 'utf8');


const db = new sqlite3.Database('library_management.sqlite');

db.serialize(() => {
  db.run(initDBScript, (err) => {
    if (err) {
      console.error('Error initializing database:', err);
    } else {
      console.log('Database initialized successfully.');
    }
    db.close();
  });
});
