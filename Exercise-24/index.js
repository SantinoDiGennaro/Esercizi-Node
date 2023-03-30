const fs = require("node:fs/promises");

class Logger {
    constructor(logStorage) {
        this.logStorage = logStorage;
    }

    async info(message) {
        await this.logStorage.appendFile(`[INFO] ${message}\n`);
    }

    async error(message) {
        await this.logStorage.appendFile(`[ERROR] ${message}\n`);
    }

    async replay() {
        console.log(await this.logStorage.readFile());
    }
}

class LogStorageFSAdapter {
    constructor(filepath) {
        this.filepath = filepath;
    }

    async appendFile(message) {
        try {
            await fs.appendFile(this.filepath, `${message}\n`);
        } catch (error) {
            console.error(error);
        }
    }

    async readFile() {
        try {
            return await fs.readFile(this.filepath, { encoding: "utf-8" });
        } catch (error) {
            console.error(error);
        }
    }
}

const fsStorage = new LogStorageFSAdapter("output.log");

const logger = new Logger(fsStorage);

logger.info("Some information");

logger.error("A bit of an issue");

logger.error("A catastrophic error!");

logger.info("The best information");

logger.replay();
