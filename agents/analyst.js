import gemini from "../models/gemini.js";
import rolePrompt from "../prompts/analyst_role.js";
import inputPrompt from "../prompts/analyst_input.js";
import feedbackPrompt from "../prompts/analyst_feedback.js";

export default class Analyst {
    static async designTestCases(inputs, previousTestCase = null, feedback = null, maxTestCases = process.env.DEFAULT_MAX_TEST_CASES) {
        const model = gemini.instance;

        const filledRolePrompt = await rolePrompt.format({
            MAX_TEST_CASES: maxTestCases,
        });
        let filledPrompt = await inputPrompt.format({
            inputList: inputs.map(item => item.label.trim()).join("\n"),
        });

        if (previousTestCase && feedback) {
            const filledFeedbackPrompt = await feedbackPrompt.format({
                previousTestCase,
                feedback,
            });
            filledPrompt = `${filledFeedbackPrompt}\n${filledPrompt}`;
        }

        return await model.invoke([
            filledRolePrompt,
            filledPrompt
        ]);
    }
}
