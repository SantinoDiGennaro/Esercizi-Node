"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.multerOptions = exports.storage = exports.generatePhotoFilename = void 0;
const multer = require("multer");
const node_crypto_1 = require("node:crypto");
const mime = require("mime");
const generatePhotoFilename = (mimeType) => {
    const randomFilename = `${(0, node_crypto_1.randomUUID)()}.${Date.now()}`;
    const fileExtension = mime.getExtension(mimeType);
    const filename = `${randomFilename}.${fileExtension}`;
    return filename;
};
exports.generatePhotoFilename = generatePhotoFilename;
exports.storage = multer.diskStorage({
    destination: "upload/",
    filename: (req, file, callback) => {
        return callback(null, (0, exports.generatePhotoFilename)(file.mimetype));
    },
});
const MAX_SIZE_IN_MEGABYTES = 6 * 1024 * 1024;
const VALID_MINE_TYPES = ["image/png", "image.jpeg"];
const fileFilter = (req, file, callback) => {
    if (VALID_MINE_TYPES.includes(file.mimeType)) {
        callback(null, true);
    }
    else {
        callback(new Error("Error: The uploaded file must bu a JPG or a PNG image."));
    }
};
exports.multerOptions = {
    fileFilter,
    limits: {
        fileSize: MAX_SIZE_IN_MEGABYTES,
    },
};
const upload = () => {
    return multer({ storage: exports.storage, ...exports.multerOptions });
};
exports.upload = upload;
//# sourceMappingURL=multer.js.map