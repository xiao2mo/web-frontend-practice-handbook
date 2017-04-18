// @flow
import Spider from "./Spider.js";

export default class Crawler {
  // 存放所有的爬虫信息
  spiders: Array<Spider> = [];

  setSpider() {}

  transform(data: Array<any>): Array<any> {
    return [];
  }

  /**
   * @function 执行单个爬虫
   */
  run() {}
}
