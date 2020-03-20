const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ data: "저는 데이터에요" }));

module.exports = router;
