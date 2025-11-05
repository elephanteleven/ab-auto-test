import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class ChatHistoryKeeper {
    constructor(fileName) {
        this._fileName = fileName;
    }

    async keepHistory(role, message) {
        return new Promise((resolve, reject) => {
            const filePath = `${__dirname}/../${process.env.HISTORY_FOLDER_PATH_NAME}/${this._fileName}`;

            fs.appendFile(
                filePath,
                `\n\n<< ${role} >>\n${message}`,
                function (err) {
                    if (err) return reject(err);

                    resolve();
                });
        });
    }
}
