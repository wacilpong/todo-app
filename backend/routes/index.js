const express = require("express");
const db = require("../database");
const router = express.Router();

/*
 * todo CRUD
 */
router.post("/todo", ({ body: { contents, isDone } }, res) => {
  const STATEMENT = `
    INSERT INTO todo (
      contents, createdAt, updatedAt, isDone
    ) VALUES (
      "${contents}", datetime("now","localtime"), "", ${Number(isDone)}
    );
  `;

  db.run(STATEMENT, error => {
    if (error) res.status(500).json({ error: error.message });

    res.json({ message: "등록되었습니다." });
  });
});

router.get("/todo", ({ query: { page = 1, size = 5 } }, res) => {
  const STATEMENT_TODO = `
    SELECT * FROM todo
    WHERE isDeleted == 0
    LIMIT ${size}
    OFFSET ${size * (page - 1)}
  `;

  const STATEMENT_REFERENCE = `
    SELECT todoId, referenceTodoId FROM todo_reference AS A
      INNER JOIN todo AS B
      ON (A.todoId == B.id)
  `;

  db.all(STATEMENT_TODO, (error, rowsTodo) => {
    if (error) res.status(500).json({ error: error.message });

    db.all(STATEMENT_REFERENCE, (error, rowsReference) => {
      if (error) res.status(500).json({ error: error.message });

      const result = rowsTodo.map(t => {
        const references = rowsReference.filter(r => r.todoId === t.id);
        t.referenceTodoId = references;
        return t;
      });

      res.json({ data: result });
    });
  });
});

router.get("/todo/:id", ({ params: { id } }, res) => {
  const STATEMENT = `SELECT * FROM todo WHERE id == ${id}`;

  db.each(STATEMENT, (error, row) => {
    if (error) res.status(500).json({ error: error.message });

    res.json({ data: row });
  });
});

router.patch("/todo/:id", ({ body, params: { id } }, res) => {
  let queryCase = "";

  if (body.contents) queryCase = `contents = "${body.contents}"`;
  if (body.isDone) queryCase = `isDone = ${Number(body.isDone)}`;

  const STATEMENT = `
    UPDATE todo SET
      updatedAt = datetime("now","localtime"), ${queryCase}
    WHERE id == ${id}
  `;

  db.run(STATEMENT, error => {
    if (error) res.status(500).json({ error: error.message });

    res.json({ message: "수정되었습니다." });
  });
});

router.delete("/todo/:id", ({ params: { id } }, res) => {
  const STATEMENT_UPDATE = `UPDATE todo SET isDeleted = 0 WHERE id == ${id}`;
  const STATEMENT_DELETE = `DELETE FROM todo_reference WHERE referenceTodoId == ${id}`;

  db.serialize(() => {
    db.run(STATEMENT_UPDATE, error => {
      if (error) res.status(500).json({ error: error.message });
    });

    db.all(STATEMENT_DELETE, error => {
      if (error) res.status(500).json({ error: error.message });
    });

    res.json({ message: "삭제되었습니다." });
  });
});

/*
 * todo_reference CRUD
 */
router.post(
  "/todo/:id/references",
  ({ params: { id }, body: { referenceTodoId } }, res) => {
    const STATEMENT = `
      INSERT INTO todo_reference
      VALUES
        ${referenceTodoId.map(v => `(${id}, ${Number(v)})`)}
    `;

    db.run(STATEMENT, error => {
      if (error) res.status(500).json({ error: error.message });

      res.json({
        message: `${id}번 todo에 ${referenceTodoId.length}개의 todo가 참조되었습니다.`
      });
    });
  }
);

router.get("/todo/:id/references", ({ params: { id } }, res) => {
  const STATEMENT = `SELECT * FROM todo_reference WHERE todoId == ${id}`;

  db.all(STATEMENT, (error, rows) => {
    if (error) res.status(500).json({ error: error.message });

    res.json({ data: rows });
  });
});

module.exports = router;
