"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require("express-async-errors");
const data_1 = __importDefault(require("./routes/data"));
const auth_1 = __importDefault(require("./routes/auth"));
const cors_1 = require("./lib/middleware/cors");
const session_1 = require("./lib/middleware/session");
const passport_1 = require("./lib/middleware/passport");
const app = express();
app.use((0, session_1.initSessionMiddleware)());
app.use(passport_1.passport.initialize());
app.use(passport_1.passport.session());
app.use(express.json());
app.use((0, cors_1.initCorsMiddleware)());
app.use("/data", data_1.default);
app.use("/auth", auth_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map