// @flow
import execute
  from "/Users/apple/Desktop/WorkSpace/GitHub/web-frontend-practice-handbook/OpenSource/fluent-fetcher/src/execute.js";
import { $ } from "./HTMLParser.js";

type ModelType = {
  [string]: string
};

/**
 * @function 爬虫类
 */
export default class Spider {
  // 组件名
  displayName: string = "Spider";

  urlsOrGenerator: Array<string> | (() => {}) = [];

  option = {};

  extra: any;

  // 模型定义
  /**
      key:".selector"
   */
  model: ModelType = {};

  // 方法定义
  /**
   * @function 构造函数
   * @param {*} urlsOrGenerator URL 列表或者迭代器
   * @param {*} option 爬虫抓取选项
   * @param {*} extra 自上一级传入的额外信息
   */
  constructor(
    urlsOrGenerator: Array<string> | (() => {}),
    option: Object,
    extra: any
  ) {
    // 设置路径与配置
    urlsOrGenerator && (this.urlsOrGenerator = urlsOrGenerator);
    option && (this.option = option);
    extra && (this.extra = extra);
  }

  /**
   * @function 数据抓取
   */
  async fetch(url: string): Promise<any> {
    return await execute(url, this.option, "text");
  }

  /**
   * @function 数据提取之前的预处理
   * @param {*} pageHTML 
   */
  before_extract(pageHTML: string): string {
    return pageHTML;
  }

  // 数据提取
  async extract(pageHTML: string) {
    let pageObject = {};

    // 执行数据抽取
    let dom = $(pageHTML);

    for (let key in this.model) {
      pageObject[key] = dom.find(this.model[key]);
    }

    return pageObject;
  }

  // 数据解析
  async parse(pageElements: Object): Object {
    return {};
  }

  // 数据存储
  async persist(pageObject: Array<Object>): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  async run(): Promise<{ data: any, extra?: any }> {
    // 清空当前数据
    let data: Array<Object> = [];

    for (let url of this.urlsOrGenerator) {
      // 执行数据抓取
      let pageHTML: string = await this.fetch(url);

      pageHTML = this.before_extract(pageHTML);

      // 从界面中抽取出选定元素
      let pageElements = await this.extract(pageHTML);

      // 对元素进行解析
      let pageObject: Object = await this.parse(pageElements);

      // 将数据添加到全局数据中
      data.push(pageObject);
    }

    // 一组执行完毕后进行数据写入
    await this.persist(data);

    return { data };
  }
}
