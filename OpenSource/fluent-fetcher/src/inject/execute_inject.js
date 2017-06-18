// @flow

require("isomorphic-fetch");
import { head as injectHead } from "./injectors";

const isNode: boolean = typeof process !== "undefined";

/**
 * @function 从远端抓取
 * 如果是在 DOM 环境下则插入到 header 中，否则将抓取到的内容直接返回给调用者
 * @param urls
 * @refer https://github.com/jhabdas/fetch-inject/blob/master/src/fetch-inject.js
 */
export default function executeAndInject(urls: [string]): Promise<Array<any>> {
  if (!(urls && Array.isArray(urls)))
    return Promise.reject(new Error("`urls` must be an array"));

  // 如果是 Node，则直接返回结果
  if (isNode) {
    return Promise.all(
      urls.map((url: string) => {
        // 如果是 Node 环境，则直接返回文本内容
        return fetch(url).then(res => res.text());
      })
    );
  }

  // 否则直接抓取并且进行插入操作
}
