const express = require("express");
const db = require("../database");
const router = express.Router();

router.get("/todo", ({ query: { page = 1, size = 5 } }, res) => {
  const STATEMENT = `
    SELECT * FROM todo
    LIMIT ${size}
    OFFSET ${size * (page - 1)}
  `;

  db.all(STATEMENT, (error, rows) => {
    if (error) res.status(500).json({ error: error.message });

    res.json({ data: rows });
  });
});

router.get("/todo/:id", ({ params: { id } }, res) => {
  const STATEMENT = `SELECT * FROM todo WHERE id == ${id}`;

  db.each(STATEMENT, (error, row) => {
    if (error) res.status(500).json({ error: error.message });

    res.json({ data: row });
  });
});

router.get("/todo/:id/references", ({ params: { id } }, res) => {
  const STATEMENT = `SELECT * FROM todo_reference WHERE todoId == ${id}`;

  db.all(STATEMENT, (error, rows) => {
    if (error) res.status(500).json({ error: error.message });

    res.json({ data: rows });
  });
});

router.post("/todo", ({ query: { contents, isDone } }) => {
  const STATEMENT = `
    INSERT INTO todo (
      contents, createdAt, updatedAt, isDone
    ) VALUES (
      "${contents}", datetime("now","localtime"), "", ${Number(isDone)}
    );
  `;

  db.each(STATEMENT, (error, res) => {
    if (error) res.status(500).json({ error: error.message });
    console.log(res);
    res.json({ data: this.lastId });
  });
});

module.exports = router;
