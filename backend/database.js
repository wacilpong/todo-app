const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.resolve(__dirname, "db/source.db");

const db = new sqlite3.Database(dbPath, err => {
  if (err) return console.error(err.message);

  console.log("Connected to sqlite!");
});

const dropTodoTableQuery = `DROP TABLE IF EXISTS todo`;
const dropTodoReferenceTableQuery = `DROP TABLE IF EXISTS todo_reference`;

const createTodoQuery = `
  CREATE TABLE IF NOT EXISTS todo(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contents TEXT,
    createdAt TEXT,
    updatedAt TEXT,
    isDone INTEGER,
    isDeleted INTEGER DEFAULT 1
    );
`;

const createTodoReferenceQuery = `
  CREATE TABLE IF NOT EXISTS todo_reference(
    todoId INTEGER,
    referenceTodoId INTEGER,
    FOREIGN KEY(todoId) REFERENCES todo(id)
  );
`;

// const insertTodoReferenceQuery = `
//   INSERT INTO todo_reference VALUES ();
// `;

db.serialize(() => {
  db.each(dropTodoTableQuery);
  db.each(dropTodoReferenceTableQuery);
  db.each(createTodoQuery);
  db.each(createTodoReferenceQuery);
  // db.each(insertTodoReferenceQuery);
});

module.exports = db;
