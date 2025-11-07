import { PromptTemplate } from "@langchain/core/prompts";

export default new PromptTemplate({
    template: `
        There is the html page:\n{input}\n
        Review the following test cases:\n{message}
    `,
    inputVariables: ["input", "message"],
});
