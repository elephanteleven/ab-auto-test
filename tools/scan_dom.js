import puppeteer from "puppeteer";
import { JSDOM } from "jsdom";

export default async function ScanInputDom(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    const dom = new JSDOM(await page.content());
    const fields = [];
    for (const node of dom.window.document.getElementsByClassName("item-input")) {
        const $input = node.querySelector("input");
        const $label = node.querySelector(".item-label");
        if ($input?.hasAttribute("name") && $label) fields.push({ name: $input.getAttribute("name"), label: $label.textContent });
    }
    await browser.close();
    return fields;
}
