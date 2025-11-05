import gemini from "../models/gemini.js";
import rolePrompt from "../prompts/writer_role.js";
import inputPrompt from "../prompts/writer_input.js";

export default class Writer {
    static async writeTestCases(url, inputs, message) {
        const model = gemini.instance;

        const mappedInputs = inputs.map(item => `- Label [${item.Label}] => Selector [name="${item.name}"]`).join("\n");

        const filledPrompt = await inputPrompt.format({
            inputs: mappedInputs,
            url,
            message,
        });

        return await model.invoke([
            rolePrompt,
            filledPrompt
        ]);
    }
}
