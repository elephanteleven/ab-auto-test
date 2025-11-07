import { PromptTemplate } from "@langchain/core/prompts";

export default new PromptTemplate({
    template: `
        You need to add add 'force' attribute equals true for every .type function\n
        and add the delay function to wait 5 seconds the page loads properly after .visit() function like cy.wait(5000) \n

        Redirect to the given URL: {url}\n
        Here are the test cases to write automated test scripts for:\n{message}
        Use this to map between label of input fields and their HTML element selectors. For NAME attribute, use '[name="NAME_VALUE"]':\n
        {input}
    `,
    inputVariables: ["url", "message", "input"],
});
