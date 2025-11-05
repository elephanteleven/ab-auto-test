import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class ScriptWriter {
    constructor(fileName) {
        this._fileName = fileName;
    }

    async writeScript(script) {
        return new Promise((resolve, reject) => {
            const filePath = `${__dirname}/../${process.env.CYPRESS_FOLDER_PATH_NAME}/${this._fileName}`;

            fs.appendFile(
                filePath,
                script,
                function (err) {
                    if (err) return reject(err);

                    resolve();
                });
        });
    }
}
