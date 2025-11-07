import fs from "fs";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class ScriptWriter {
    constructor(fileName, pathDir) {
        this._fileName = fileName;
        this._pathDir = pathDir;
    }

    async writeScript(script) {
        return new Promise((resolve, reject) => {
            const filePath = path.join(this._pathDir, this._fileName) || `${__dirname}/../${process.env.CYPRESS_FOLDER_PATH_NAME}/${this._fileName}`;

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
