const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send({ data: "This is data" });
});

module.exports = app;
