import express, { Router } from "express";

import prisma from "../lib/prisma/prisma";
import { upload } from "../lib/middleware/multer";
import { checkAuthorization } from "../lib/middleware/passport";

const router = Router();

router.get("/", async (req, res) => {
    const data = await prisma.database.findMany();
    res.json(data);
});

router.get("/:id", async (req, res, next) => {
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

router.post("/", checkAuthorization, async (req, res) => {
    const datas = req.body;
    const username = req.user?.username as string;

    const data = await prisma.database.create({
        data: {
            ...datas,
            createdBy: username,
            updatedBy: username,
        },
    });
    res.status(201).json(data);
});

router.put("/:id", checkAuthorization, async (req, res, next) => {
    const dataId = Number(req.params.id);
    const datas = req.body;
    const username = req.user?.username as string;
    try {
        const data = await prisma.database.update({
            where: { id: dataId },
            data: {
                ...datas,
                updatedBy: username,
            },
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(404);
        next(`Cannot PUT /data/${dataId}`);
    }
});

router.delete("/:id", checkAuthorization, async (req, res, next) => {
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

router.post(
    "/:id/photo",
    checkAuthorization,
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

export default router;
