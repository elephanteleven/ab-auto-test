import { PromptTemplate } from "@langchain/core/prompts";

export default new PromptTemplate({
    template: `Below is the html page result:\n{input}`,
    inputVariables: ["input"],
});
