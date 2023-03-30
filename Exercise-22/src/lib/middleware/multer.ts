const multer = require("multer");
import { randomUUID } from "node:crypto";
const mime = require("mime");
import { request } from "node:http";

export const generatePhotoFilename = (mimeType) => {
    const randomFilename = `${randomUUID()}.${Date.now()}`;
    const fileExtension = mime.getExtension(mimeType);
    const filename = `${randomFilename}.${fileExtension}`;
    return filename;
};

export const storage = multer.diskStorage({
    destination: "upload/",
    filename: (req, file, callback) => {
        return callback(null, generatePhotoFilename(file.mimetype));
    },
});

const MAX_SIZE_IN_MEGABYTES = 6 * 1024 * 1024;
const VALID_MINE_TYPES = ["image/png", "image.jpeg"];

const fileFilter = (req, file, callback) => {
    if (VALID_MINE_TYPES.includes(file.mimeType)) {
        callback(null, true);
    } else {
        callback(
            new Error("Error: The uploaded file must bu a JPG or a PNG image.")
        );
    }
};

export const multerOptions = {
    fileFilter,
    limits: {
        fileSize: MAX_SIZE_IN_MEGABYTES,
    },
};

export const upload = () => {
    return multer({ storage, ...multerOptions });
};
