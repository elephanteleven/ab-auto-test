import gemini from "../models/gemini.js";
import rolePrompt from "../prompts/reviewer_role.js";
import inputPrompt from "../prompts/reviewer_input.js";

export default class Reviewer {
    static async reviewTestCases(inputs, message) {
        const model = gemini.instance;

        const filledPrompt = await inputPrompt.format({
            inputs: inputs.map(item => item.label.trim()).join("\n"),
            message,
        });

        return await model.invoke([
            rolePrompt,
            filledPrompt
        ]);
    }
}
