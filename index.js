#!/usr/bin/env node

import { fileURLToPath } from 'url';
import path from "path";
import env from "dotenv";
import yargs from "yargs";
env.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), ".env") });

import AnalystAgent from "./agents/analyst.js";
import ReviewerAgent from "./agents/reviewer.js";
import WriterAgent from "./agents/writer.js";

import ChatHistoryKeeper from "./tools/chat_history.js"
import ScanInputDom from "./tools/scan_dom.js";
import ScriptWriter from "./tools/script_writer.js"

const [,, url, cyPath] = process.argv;
async function main() {
    const scriptFileName = `script_${Date.now()}.cy.js`;
    const chatHistory = new ChatHistoryKeeper(`chat_history_${Date.now()}.txt`);

    console.log(`URL: ${url}`);
    console.log(`Cypress path: ${cyPath}`);
    const scriptWriter = new ScriptWriter(scriptFileName, cyPath);
    const scaner = new ScanInputDom(url);

    console.log("Scan inputs...");
    const input = await scaner.getPageContent("main");
    let feedback = null;
    let previousTestCase = null;

    // Hey PONG !!!
    // Those code is not be the best practice, YOU SHOULD USE [LangGraph] to manage those LLM flow. :P
    for (let i = 0; i < process.env.DEFAULT_TIMES_OF_REVIEW; i++) {
        console.log(`--- Review Round ${i + 1} ---`);

        console.log("Analyst thinking...");
        const response_analyst = await AnalystAgent.designTestCases(input, previousTestCase, feedback);
        previousTestCase = response_analyst.content;
        chatHistory.keepHistory(`Analyst #${i + 1}`, previousTestCase);

        if (i === process.env.DEFAULT_TIMES_OF_REVIEW - 1) break;

        console.log("Reviewer reviewing...");
        const response_writer = await ReviewerAgent.reviewTestCases(input, response_analyst.content);
        feedback = response_writer.content;
        chatHistory.keepHistory(`Reviewer #${i + 1}`, feedback);
    }

    console.log("Writer writing...");
    const response_writer = await WriterAgent.writeTestCases(url, input, previousTestCase);
    chatHistory.keepHistory("Writer", response_writer.content);

    scriptWriter.writeScript(response_writer.content);
    console.log(`The script has been written to ${process.env.CYPRESS_FOLDER_PATH_NAME}/${scriptFileName}`);
    await scaner.closeBrowser();
}
main();
