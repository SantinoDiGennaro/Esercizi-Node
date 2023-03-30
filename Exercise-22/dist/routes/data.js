"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma/prisma"));
const multer_1 = require("../lib/middleware/multer");
const passport_1 = require("../lib/middleware/passport");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const data = await prisma_1.default.database.findMany();
    res.json(data);
});
router.get("/:id", async (req, res, next) => {
    const dataId = Number(req.params.id);
    const data = await prisma_1.default.database.findUnique({
        where: { id: dataId },
    });
    if (!data) {
        res.status(404);
        return next(`Cannot GET /data/${dataId}`);
    }
    res.json(data);
});
router.post("/", passport_1.checkAuthorization, async (req, res) => {
    const datas = req.body;
    const username = req.user?.username;
    const data = await prisma_1.default.database.create({
        data: {
            ...datas,
            createdBy: username,
            updatedBy: username,
        },
    });
    res.status(201).json(data);
});
router.put("/:id", passport_1.checkAuthorization, async (req, res, next) => {
    const dataId = Number(req.params.id);
    const datas = req.body;
    const username = req.user?.username;
    try {
        const data = await prisma_1.default.database.update({
            where: { id: dataId },
            data: {
                ...datas,
                updatedBy: username,
            },
        });
        res.status(200).json(data);
    }
    catch (error) {
        res.status(404);
        next(`Cannot PUT /data/${dataId}`);
    }
});
router.delete("/:id", passport_1.checkAuthorization, async (req, res, next) => {
    const dataId = Number(req.params.id);
    try {
        await prisma_1.default.database.delete({
            where: { id: dataId },
        });
        res.status(204).end();
    }
    catch (error) {
        res.status(404);
        next(`Cannot DELETE /data/${dataId}`);
    }
});
router.post("/:id/photo", passport_1.checkAuthorization, (0, multer_1.upload)().single("photo"), async (req, res, next) => {
    console.log("request.file", req.file);
    if (!req.file) {
        res.status(400);
        return next("No photo file uploaded");
    }
    const photoFilename = req.file.filename;
    res.status(201).json({ photoFilename });
});
exports.default = router;
//# sourceMappingURL=data.js.map