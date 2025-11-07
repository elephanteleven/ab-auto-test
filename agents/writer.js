import gemini from "../models/gemini.js";
import rolePrompt from "../prompts/writer_role.js";
import inputPrompt from "../prompts/writer_input.js";

export default class Writer {
    static async writeTestCases(url, input, message) {
        const model = gemini.instance;
        const filledPrompt = await inputPrompt.format({
            input,
            url,
            message,
        });

        return await model.invoke([
            rolePrompt,
            filledPrompt
        ]);
    }
}
