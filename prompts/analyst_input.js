import { PromptTemplate } from "@langchain/core/prompts";

export default new PromptTemplate({
    template: `Below is the list of all input fields found on this page:\n{inputList}`,
    inputVariables: ["inputList"],
});
