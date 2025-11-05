#!/usr/bin/env node

import env from "dotenv";
import yargs from "yargs";
env.config();

import AnalystAgent from "./agents/analyst.js";
import ReviewerAgent from "./agents/reviewer.js";
import WriterAgent from "./agents/writer.js";

import ChatHistoryKeeper from "./tools/chat_history.js"
import ScanInputDom from "./tools/scan_dom.js";
import ScriptWriter from "./tools/script_writer.js"

async function main() {
    const options = {
        url: "http://192.168.1.7:10001/?email=guy.kaewkan@gsdxt.com",
    };
    // const options = yargs
    //     .usage("Usage: -url <url>")
    //     .option("url", { alias: "url", describe: "Your URL", type: "string", demandOption: true })
    //     .argv;

    const scriptFileName = `script_${Date.now()}.cy.js`;

    const chatHistory = new ChatHistoryKeeper(`chat_history_${Date.now()}.txt`);
    const scriptWriter = new ScriptWriter(scriptFileName);

    console.log("Scan inputs...");
    const inputs = await ScanInputDom(options.url);

    let feedback = null;
    let previousTestCase = null;

    // Hey PONG !!!
    // Those code is not be the best practice, YOU SHOULD USE [LangGraph] to manage those LLM flow. :P
    for (let i = 0; i < process.env.DEFAULT_TIMES_OF_REVIEW; i++) {
        console.log(`--- Review Round ${i + 1} ---`);

        console.log("Analyst thinking...");
        const response_analyst = await AnalystAgent.designTestCases(inputs, previousTestCase, feedback);
        previousTestCase = response_analyst.content;
        chatHistory.keepHistory(`Analyst #${i + 1}`, previousTestCase);

        if (i === process.env.DEFAULT_TIMES_OF_REVIEW - 1) break;

        console.log("Reviewer reviewing...");
        const response_writer = await ReviewerAgent.reviewTestCases(inputs, response_analyst.content);
        feedback = response_writer.content;
        chatHistory.keepHistory(`Reviewer #${i + 1}`, feedback);
    }

    console.log("Writer writing...");
    const response_writer = await WriterAgent.writeTestCases(options.url, inputs, previousTestCase);
    chatHistory.keepHistory("Writer", response_writer.content);

    scriptWriter.writeScript(response_writer.content);
    console.log(`The script has been written to ${process.env.CYPRESS_FOLDER_PATH_NAME}/${scriptFileName}`);
}
main();
