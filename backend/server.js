const express = require("express");
const bodyParser = require("body-parser");
const api = require("./routes/index");

const app = express();
const port = 3777;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", api);

app.listen(port, () => console.log(`Listening on port ${port}!`));
