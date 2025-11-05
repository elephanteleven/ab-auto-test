import { PromptTemplate } from "@langchain/core/prompts";

export default new PromptTemplate({
    template: `
        Use the feedback to improve the previous test case.

        Previous Test Case:
        {previousTestCase}

        Feedback:
        {feedback}
    `,
    inputVariables: ["previousTestCase", "feedback"],
});
