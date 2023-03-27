const express = require("express");
import "express-async-errors";
const cors = require("cors");

import prisma from "./lib/prisma/prisma";
import { upload } from "./lib/middleware/multer";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/data", async (req, res) => {
    const data = await prisma.database.findMany();
    res.json(data);
});

app.get("/data/:id", async (req, res, next) => {
    const dataId = Number(req.params.id);
    const data = await prisma.database.findUnique({
        where: { id: dataId },
    });
    if (!data) {
        res.status(404);
        return next(`Cannot GET /data/${dataId}`);
    }
    res.json(data);
});

app.post("/data", async (req, res) => {
    const datas = req.body;
    const data = await prisma.database.create({
        data: datas,
    });
    res.status(201).json(data);
});

app.put("/data/:id", async (req, res, next) => {
    const dataId = Number(req.params.id);
    const datas = req.body;
    try {
        const data = await prisma.database.update({
            where: { id: dataId },
            data: datas,
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(404);
        next(`Cannot PUT /data/${dataId}`);
    }
});

app.delete("/data/:id", async (req, res, next) => {
    const dataId = Number(req.params.id);
    try {
        await prisma.database.delete({
            where: { id: dataId },
        });
        res.status(204).end();
    } catch (error) {
        res.status(404);
        next(`Cannot DELETE /data/${dataId}`);
    }
});

app.post(
    "/data/:id/photo",
    upload().single("photo"),
    async (req, res, next) => {
        console.log("request.file", req.file);
        if (!req.file) {
            res.status(400);
            return next("No photo file uploaded");
        }
        const photoFilename = req.file.filename;
        res.status(201).json({ photoFilename });
    }
);

export default app;
