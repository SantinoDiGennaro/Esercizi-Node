import express from "express";
import "express-async-errors";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import { randomUUID } from "node:crypto";
import mime from "mime";

const generatePhotoFilename = (mimeType) => {
    const randomFilename = `${randomUUID()}.${Date.now()}`;
    const fileExtension = mime.getExtension(mimeType);
    const filename = `${randomFilename}.${fileExtension}`;
    return filename;
};

const MAX_SIZE_IN_MEGABYTES = 6 * 1024 * 1024;
const VALID_MINE_TYPES = ["image/png", "image.jpeg"];

const fileFilter = (req, file, callback) => {
    if (VALID_MINE_TYPES.includes(file.mimeType)) {
        callback(null, true);
    } else {
        callback(
            new Error("Erro: The uploaded file must bu a JPG or a PNG image.")
        );
    }
};

const multerOptions = {
    fileFilter,
    limits: {
        fileSize: MAX_SIZE_IN_MEGABYTES,
    },
};

const storage = multer.diskStorage({
    destination: "upload/",
    filename: (req, file, callback) => {
        return callback(null, generatePhotoFilename(file.mimetype));
    },
});

const upload = () => {
    return multer({ storage, ...multerOptions });
};

const prisma = new PrismaClient();

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
