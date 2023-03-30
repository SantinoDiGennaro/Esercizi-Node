"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCorsMiddleware = void 0;
const cors = require("cors");
function initCorsMiddleware() {
    const corsOption = {
        origin: "http://localhost:8080",
        credentials: true,
    };
    return cors(corsOption);
}
exports.initCorsMiddleware = initCorsMiddleware;
//# sourceMappingURL=cors.js.map