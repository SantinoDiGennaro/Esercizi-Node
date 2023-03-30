"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const missingSetting = "warning: no value set for this envirorment varible";
const config = {
    PORT: process.env.PORT || missingSetting,
    SESSION_SECRET: process.env.SESSION_SECRET || missingSetting,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || missingSetting,
    GITHUB_SECRET_ID: process.env.GITGUB_CLIENT_SECRET || missingSetting,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL || missingSetting,
};
exports.default = config;
//# sourceMappingURL=config.js.map