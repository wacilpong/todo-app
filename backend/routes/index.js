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
  const SQL = `
    INSERT INTO todo (
      contents, createdAt, updatedAt, isDone
    ) VALUES (
      "${contents}", datetime("now","localtime"), "", 0
    );
  `;

  db.run(SQL, error => {
    if (error) res.status(500).json({ error: error.message });

    res.json({ message: "등록되었습니다.", data: {}, meta: {} });
  });
});

router.get(
  "/todo",
  (
    {
      query: { page = 1, size = 5, deleted = "0", sort = "newest", done, query }
    },
    res
  ) => {
    const TODO_WHERE = `
      WHERE (
        isDeleted == ${Number(deleted)}
        ${done !== undefined ? `AND isDone == ${Number(done)}` : ``}
        ${
          query !== undefined
            ? `AND (contents LIKE "%${query}%" OR id == ${query})`
            : ``
        }
      )
    `;

    const SQL_TODO = `
      SELECT * FROM todo
      ${TODO_WHERE}
      ORDER BY createdAt ${sort === "newest" ? "DESC" : "ASC"}
      LIMIT ${size}
      OFFSET ${size * (page - 1)}
    `;

    const SQL_REFERENCE = `
      SELECT todoId, referenceTodoId FROM todo_reference AS A
      INNER JOIN todo AS B
      ON (A.todoId == B.id)
    `;

    const SQL_TOTAL_COUNT = `
      SELECT count(*) AS totalCount
      FROM todo
      ${TODO_WHERE}
    `;

    // TODO: 중첩 콜백함수 제거, row를 다른곳에 저장해두고 가공할 방법 찾기
    db.all(SQL_TODO, (error, rowsTodo) => {
      if (error) res.status(500).json({ error: error.message });

      db.all(SQL_REFERENCE, (error2, rowsReference) => {
        if (error2) res.status(500).json({ error: error2.message });

        db.each(SQL_TOTAL_COUNT, (error3, totalCount) => {
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
  }
);

router.get("/todo/:id", ({ params: { id } }, res) => {
  const SQL = `SELECT * FROM todo WHERE id == ${id}`;

  db.each(SQL, (error, row) => {
    if (error) res.status(500).json({ error: error.message });

    res.json({ data: row });
  });
});

router.patch("/todo/:id", ({ body, params: { id } }, res) => {
  let queryCase = "";

  if (body.contents !== undefined) queryCase = `contents = "${body.contents}"`;
  if (body.isDone !== undefined) queryCase = `isDone = ${body.isDone}`;

  const SQL = `
    UPDATE todo SET
      updatedAt = datetime("now","localtime"), ${queryCase}
    WHERE id == ${id}
  `;

  db.run(SQL, error => {
    if (error) res.status(500).json({ error: error.message });

    res.json({ message: "수정되었습니다.", data: {}, meta: {} });
  });
});

router.delete("/todo/:id", ({ params: { id } }, res) => {
  const SQL_UPDATE = `UPDATE todo SET isDeleted = 1 WHERE id == ${id}`;
  const SQL_DELETE = `DELETE FROM todo_reference WHERE (todoId == ${id} OR referenceTodoId == ${id})`;

  db.serialize(() => {
    db.run(SQL_UPDATE, error => {
      if (error) res.status(500).json({ error: error.message });
    });

    db.all(SQL_DELETE, error => {
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
    const SQL = `
      INSERT INTO todo_reference
      SELECT ${id}, ${referenceTodoId}
      WHERE NOT EXISTS (
        SELECT * FROM todo_reference
        WHERE
        (todoId == ${id} AND referenceTodoId == ${referenceTodoId}) OR
        (todoId == ${referenceTodoId} AND referenceTodoId == ${id})
      )
    `;

    db.run(SQL, function(error) {
      if (error) res.status(500).json({ error: error.message });

      res.json({
        message:
          this.changes > 0
            ? `${id}번 todo에 ${referenceTodoId}번 todo가 참조되었습니다.`
            : `이미 참조된 todo입니다.`,
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
