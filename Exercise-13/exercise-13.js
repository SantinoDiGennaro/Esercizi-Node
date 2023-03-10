const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.json({ data: "This is data" });
});

module.exports = app;
