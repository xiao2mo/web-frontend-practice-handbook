[![返回目录](https://parg.co/UYp)](https://github.com/wx-chevalier/Web-Series/)

# 自定义浏览器支持

```js
/**
 * Testcafe browser provider plugin for the nightmare browser automation library.
 */
import Nightmare from 'nightmare';
import debug from 'debug';

export default {
  // reference to Nightmare instance
  nightmare: null, // map with open page references

  openedPages: {}, // multiple browsers support

  isMultiBrowser: false, // open new page in browser

  async openBrowser(id, pageUrl) {
    const page = await this.nightmare.goto(pageUrl);

    this.openedPages[id] = page;
  }, // close given page in browser

  async closeBrowser(id) {
    const page = this.openedPages[id];

    delete this.openedPages[id];
    await page.end();
  }, // init browser

  async init() {
    const conf = {
      show: debug.enabled(),
      openDevTools: debug.enabled()
    };

    this.nightmare = Nightmare(conf);
  },

  async dispose() {
    return;
  }, // resize browser window to given size

  async resizeWindow(id, width, height) {
    await this.nightmare.viewport(width, height);
  }, // take screenshot of given page in browser

  async takeScreenshot(id, screenshotPath) {
    await this.nightmare.screenshot(screenshotPath);
  }
};
```
