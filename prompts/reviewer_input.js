import { PromptTemplate } from "@langchain/core/prompts";

export default new PromptTemplate({
    template: `
        There are the following input fields on the page:\n{inputs}\n
        Review the following test cases:\n{message}
    `,
    inputVariables: ["inputs", "message"],
});
