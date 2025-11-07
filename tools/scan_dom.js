import puppeteer from "puppeteer";
import { JSDOM } from "jsdom";

export default class ScanInputDom {
   constructor(url) {
      this._url = url;
      this._browser = null;
   }

   async getPageContent(pageName) {
      this._browser = this._browser || await puppeteer.launch();
      let page = (await this._browser.pages())[0];
      if (page == null)
         page = await this._browser.newPage();
      if (page.url() === "about:blank")
         await page.goto(this._url, { waitUntil: 'networkidle0' });
      return await page.content();
   };

   async closePage(pageName) {
      const pageIndex = this._pages.findIndex(page => page.name === pageName);
      if (pageIndex === -1) return;
      const page = this._pages.splice(pageIndex, 1);
      await page.close();
   }

   async closeBrowser() {
      if (this._browser == null) return;
      await this._browser.close();
      this._browser == null;
   }
}
