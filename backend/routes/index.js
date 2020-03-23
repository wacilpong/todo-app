const express = require("express");
const db = require("../database");
const router = express.Router();

// TODO: 가져온 쿼리 데이터를 가공하는 부분을 분리하기
// TODO: ORM 방식을 고려해보기
// TODO: 500번 에러별 메세지 처리
/*
 * todo CRUD
 */
router.post("/todo", ({ body: { contents } }, res) => {
  const STATEMENT = `
    INSERT INTO todo (
      contents, createdAt, updatedAt, isDone
    ) VALUES (
      "${contents}", datetime("now","localtime"), "", 0
    );
  `;

  db.run(STATEMENT, error => {
    if (error) res.status(500).json({ error: error.message });

    res.json({ message: "등록되었습니다.", data: {}, meta: {} });
  });
});

router.get("/todo", async ({ query: { page = 1, size = 5 } }, res) => {
  const STATEMENT_TODO = `
  SELECT * FROM todo
  WHERE isDeleted == 0
  ORDER BY createdAt DESC
  LIMIT ${size}
  OFFSET ${size * (page - 1)}
  `;

  const STATEMENT_REFERENCE = `
  SELECT todoId, referenceTodoId FROM todo_reference AS A
  INNER JOIN todo AS B
  ON (A.todoId == B.id)
  `;

  const STATEMENT_TOTAL_COUNT = `SELECT count(*) AS totalCount FROM todo WHERE isDeleted == 0`;

  // TODO: 중첩 콜백함수 제거, row를 다른곳에 저장해두고 가공할 방법 찾기
  db.all(STATEMENT_TODO, (error, rowsTodo) => {
    if (error) res.status(500).json({ error: error.message });

    db.all(STATEMENT_REFERENCE, (error2, rowsReference) => {
      if (error2) res.status(500).json({ error: error2.message });

      db.each(STATEMENT_TOTAL_COUNT, (error3, totalCount) => {
        if (error3) res.status(500).json({ error: error3.message });

        const result = rowsTodo.map(t => {
          const references = rowsReference
            .filter(r => r.todoId === t.id)
            .map(row => row.referenceTodoId);

          t.referenceTodoId = references;
          return t;
        });

        res.json({ data: result, meta: totalCount });
      });
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

  if (body.contents !== undefined) queryCase = `contents = "${body.contents}"`;
  if (body.isDone !== undefined) queryCase = `isDone = ${body.isDone}`;

  const STATEMENT = `
    UPDATE todo SET
      updatedAt = datetime("now","localtime"), ${queryCase}
    WHERE id == ${id}
  `;

  db.run(STATEMENT, error => {
    if (error) res.status(500).json({ error: error.message });

    res.json({ message: "수정되었습니다.", data: {}, meta: {} });
  });
});

router.delete("/todo/:id", ({ params: { id } }, res) => {
  const STATEMENT_UPDATE = `UPDATE todo SET isDeleted = 1 WHERE id == ${id}`;
  const STATEMENT_DELETE = `DELETE FROM todo_reference WHERE referenceTodoId == ${id}`;

  db.serialize(() => {
    db.run(STATEMENT_UPDATE, error => {
      if (error) res.status(500).json({ error: error.message });
    });

    db.all(STATEMENT_DELETE, error => {
      if (error) res.status(500).json({ error: error.message });
    });

    res.json({ message: "삭제되었습니다.", data: {}, meta: {} });
  });
});

/*
 * todo_reference CRUD
 */
router.post(
  "/todo/:id/reference",
  ({ params: { id }, body: { referenceTodoId } }, res) => {
    const STATEMENT = `
      INSERT INTO todo_reference
      VALUES (${id}, ${referenceTodoId})
    `;

    db.run(STATEMENT, error => {
      if (error) res.status(500).json({ error: error.message });

      res.json({
        message: `${id}번 todo에 ${referenceTodoId}번 todo가 참조되었습니다.`,
        data: {},
        meta: {}
      });
    });
  }
);

router.get("/todo/:id/reference", ({ params: { id } }, res) => {
  const STATEMENT = `SELECT * FROM todo_reference WHERE todoId == ${id}`;

  db.all(STATEMENT, (error, rows) => {
    if (error) res.status(500).json({ error: error.message });

    res.json({ data: rows, meta: {} });
  });
});

module.exports = router;
