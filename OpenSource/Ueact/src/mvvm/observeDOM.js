// @flow

import { observe } from 'observer-x/dist/observer-x.es';

let innerContext;

export function observeDOM(ele: Element, context = {}) {
  innerContext = Object.assign({}, context);

  let state = observe(innerContext.state);

  innerContext.state = state;

  let method = innerContext.method;

  for (let methodName of Object.keys(method)) {
    method[methodName] = method[methodName].bind(innerContext);
  }

  state.listen(changes => {
    renderFromStr(ele, innerContext);
  });

  // 判断是否存在 Babel 变量
  const isTranslated = typeof Babel === undefined;

  // 如果尚未编译，则首先执行编译
  if (!isTranslated) {
    let input = trimEventQuote(ele.innerHTML);

    let output = Babel.transform(input, {
      plugins: [
        [
          'transform-react-jsx',
          {
            pragma: 'Ueact.createDOMElement'
          }
        ]
      ]
    }).code;

    innerContext.rawJSX = output;

    renderFromStr(ele, innerContext);
  }
}

function renderFromStr(ele, innerContext) {
  let { state, method } = innerContext;

  ele.replaceChild(eval(innerContext.rawJSX), ele.firstElementChild);
}

/**
 * Description 去除输入的 HTML 中的
 * @param str
 * @return {string}
 */
function trimEventQuote(str: string) {
  let tmpStr = str;

  // 匹配所有的监听
  const regex = /on\w*="{[\w|\.]*}"/g;

  let match;
  while ((match = regex.exec(tmpStr))) {
    tmpStr = tmpStr.replace(match[0], match[0].replace(/"/g, ''));
  }

  return tmpStr;
}
