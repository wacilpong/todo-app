const path = require("path");
const express = require("express");
const { Op } = require("sequelize");
const db = require("../database");
const upload = require("../manager/multerManage");

const router = express.Router();

// TODO: 500번 에러별 메세지 처리
/*
 * todo CRUD
 */

router.post("/todo", ({ body: { contents } }, res) => {
  db.Todo.create({ contents }, { include: [db.TodoReference] })
    .then(({ dataValues }) => {
      res.json({ message: "등록되었습니다.", data: dataValues, meta: {} });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

router.get(
  "/todo",
  (
    {
      query: {
        page = 1,
        size = 5,
        deleted = "0",
        sort = "newest",
        keyword = "",
        done
      }
    },
    res
  ) => {
    const where = {
      isDeleted: Number(deleted),
      [Op.or]: [
        {
          contents: { [Op.like]: `%${keyword}%` }
        },
        {
          id: { [Op.like]: `%${keyword}%` }
        }
      ]
    };

    if (done !== undefined) where["isDone"] = Number(done);

    db.Todo.findAndCountAll({
      limit: size,
      offset: size * (page - 1),
      order: [["createdAt", sort === "newest" ? "DESC" : "ASC"]],
      group: ["todo.id"],
      include: {
        model: db.TodoReference,
        attributes: ["todoReferenceId"]
      },
      where
    })
      .then(({ rows, count }) => {
        res.json({ data: rows, meta: { totalCount: count.length } });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  }
);

router.get("/todo/:id", async ({ params: { id } }, res) => {
  try {
    const row = await db.Todo.findOne({ where: { id } });

    res.json({ data: row, meta: {} });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch(
  "/todo/:id",
  ({ body: { contents, isDone }, params: { id } }, res) => {
    db.Todo.update({ contents, isDone }, { where: { id } })
      .then(() => {
        res.json({ message: "수정되었습니다.", data: {}, meta: {} });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  }
);

router.delete("/todo/:id", async ({ params: { id } }, res) => {
  await db.TodoReference.destroy({
    where: {
      [Op.or]: [{ todoId: id }, { todoReferenceId: id }]
    }
  });

  await db.Todo.update({ isDeleted: 1 }, { where: { id } });

  res.json({
    message: "삭제되었습니다.",
    data: {},
    meta: {}
  });
});

/*
 * todo_reference CRUD
 */
router.post(
  "/todo/:id/reference",
  ({ params: { id }, body: { todoReferenceId } }, res) => {
    db.TodoReference.findOrCreate({
      where: {
        [Op.or]: [
          { [Op.and]: [{ todoId: id }, { todoReferenceId }] },
          { [Op.and]: [{ todoId: todoReferenceId }, { todoReferenceId: id }] }
        ]
      },
      defaults: {
        todoId: id,
        todoReferenceId
      }
    }).spread((todo, created) => {
      const row = todo.get({ plain: true });

      if (created) {
        res.json({
          message: `${id}번 todo에 ${todoReferenceId}번 todo가 참조되었습니다.`,
          data: row,
          meta: {}
        });
      } else {
        res.json({
          message: `이미 참조되었거나 순환 참조되는 todo입니다.`,
          data: row,
          meta: {}
        });
      }
    });
  }
);

router.get("/todo/:id/reference", async ({ params: { id } }, res) => {
  try {
    const rows = await db.TodoReference.findAll({
      where: {
        todoId: id
      }
    });

    res.json({ data: rows, meta: {} });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete(
  "/todo/:id/reference/:todoReferenceId",
  ({ params: { id, todoReferenceId } }, res) => {
    db.TodoReference.destroy({
      where: { todoId: id, todoReferenceId }
    })
      .then(() => {
        res.json({ data: {}, meta: {} });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  }
);

/*
 * common
 */
router.get("/common/backup", (req, res) => {
  const file = `${path.join(__dirname, "..", "db/source.db")}`;
  const fileName = "backup_source.db";

  res.setHeader("Content-disposition", `attachment; filename=${fileName}`);
  res.setHeader("Content-type", "application/octet-stream");

  res.download(file, fileName);
});

router.post(
  "/common/restore",
  upload.single("restoreFile"),
  ({ file }, res) => {
    if (file.filename !== "source.db") { 
      const fs = require("fs");
      const removeTarget = `${path.join(
        __dirname,
        "..",
        "db",
        file.originalname
      )}`;

      fs.unlink(removeTarget, error => {
        if (error) throw error;

        res.status(500).json({ message: "DB 파일만 복원할 수 있습니다." });
      });

      return;
    }

    res.json({ message: "복원되었습니다.", data: file.path, meta: {} });
  }
);

module.exports = router;
