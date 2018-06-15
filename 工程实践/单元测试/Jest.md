[![返回目录](https://parg.co/UYp)](https://github.com/wxyyxc1992/Web-Series/)

# 基于 Jest 的单元测试

React 官方文档中提及，Jest 是 Facebook 官方使用的组件测试库。不过 React 也并不排斥其他测试框架，你也可以根据自己的喜好或者团队的统一选择譬如 Mocha、AVA 等测试框架。本部分我们就介绍如何从零开始为项目添加基于 Jest 的测试用例。

# 环境搭建

依照惯例，我们先使用 create-react-app 命令创建项目；在 package.json 项目文件创建完毕之后即使用 npm 命令安装所需要的依赖：

```
npm install --save-dev jest
```

为了方便在 npm 中使用 jest 命令行工具来运行所有的测试用例，我们需要在 package.json 文件中添加如下脚本配置：

```
"scripts": {
  "test": "jest"
},
```

此外，为了方便对我们使用 ES2015 与 JSX 语法的组件或者类进行测试，我们需要添加部分 Babel 相关的包体来方便 Jest 对测试代码进行转化与编译：

```
npm install --save-dev babel-jest babel-preset-es2015 babel-preset-react
```

依赖安装完毕之后，我们就像配置其他的基于 Babel 的项目一样，需要添加 .babelrc 配置文件：

```
{
  "presets": ["es2015", "react"]
}
```

环境搭建完毕之后，我们就可以进行简单的测试用例编写了，譬如我们的代码库 sum.js 文件中有如下简单的相加函数：

```
/**
 * @function 计算两个数的相加和
 * @param {*} a
 * @param {*} b
 */
export default function sum(a, b) {
  return a + b;
}
```

该函数对应的测试用例放置在 sum.test.js 文件中，我们可以参考 Maven 中的文件目录格式，尽量保持 src 与 test 目录下文件结构的一致性。Jest 也会为我们自动寻找项目目录下的以 .spec、.test 结尾的文件，或者放置在 `__test__` 目录下的文件。我们的测试用例编写如下：

```
import sum from "../../src/util/sum.js";

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

测试代码编写完毕之后，我们使用 `jest test/util/sum.test.js` 命令来运行测试用例，可以在命令行中得到如下的反馈：

```
 PASS  test/util/sum.test.js
  ✓ adds 1 + 2 to equal 3 (2ms)


Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.565s, estimated 1s
Ran all test suites matching "test/util/sum.test.js".
```

到这里我们已经搭建了能够支撑 JavaScript 代码测试的环境，不过往往组件开发中，特别是基于 Webpack 等打包工具开发时，我们会在组件中导入 CSS、图片等静态资源。我们需要配置额外的 Mock 文件来处理这些静态资源，在 package.json 文件中添加以 jest 为键名的配置：

```
// package.json
{
  "jest": {
    "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(scss|css|less)$": "<rootDir>/__mocks__/styleMock.js"
    }
  }
}
```

其对应的 Mock 文件如下：

```
// __mocks__/styleMock.js


module.exports = {};
// __mocks__/fileMock.js


module.exports = 'test-file-stub';
```

除了对于静态资源文件的配置之外，我们还可以使用类似于 Webpack 中的 `modulesDirectories`、`extensions` 等配置项来自定义 Jest 的文件搜索规则：

```
// package.json
{
  "jest": {
    "modulePaths": [
      "/shared/vendor/modules"
    ],
    "moduleFileExtensions": ["js", "jsx"],
    "moduleDirectories": ["node_modules", "bower_components", "shared"],
    "moduleNameMapper": {
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
      "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
    }
  }
}
```

## Webpack

最后，我们还需要考虑如何在 Webpack 2 项目中进行 Jest 配置，其主要关注点在于 Webpack 2 提供了对于 ES2015 Modules 的原生支持；而 Jest 运行于 Node 环境下，仍然需要将 ES2015 Modules 转化为 CommonJS 模块规范。因此我们需要为 Webpack 2 项目下的 .babelrc 文件添加 test 环境的配置：

```
// .babelrc
{
  "presets": [
    ["es2015", {"modules": false}]
  ],


  "env": {
    "test": {
      "plugins": ["transform-es2015-modules-commonjs"]
    }
  }
}
```

而如果在组件开发中我们使用了动态模块导入，即 `import('some-file.js').then(module => …)` 这样的语法，我们还需要添加 dynamic-import-node 插件：

```
// .babelrc
{
  "presets": [
    ["es2015", {"modules": false}]
  ],


  "plugins": ["syntax-dynamic-import"],


  "env": {
    "test": {
      "plugins": ["dynamic-import-node"]
    }
  }
}
```

## TypeScript

```ts
const tsc = require("typescript");

const tsConfig = require("./tsconfig.json");

module.exports = {
  process(src, path) {
    if (path.endsWith(".ts") || path.endsWith(".tsx")) {
      return tsc.transpile(src, tsConfig.compilerOptions, path, []);
    }

    return src;
  }
};
```

```json
// package.json
{
  ...

  "jest": {

    "moduleFileExtensions": ["ts", "tsx", "js"],

    "transform": {

      "^.+\\.(ts|tsx)$": "<rootDir>/preprocessor.js"

    },

    "testMatch": ["**/__tests__/*.(ts|tsx|js)"]

  }

}
```

# 匹配器

# 模拟对象

# 异步代码测试

# 定时器测试

# 界面对象

对于 `React` 的 `scroll` 事件而言，必须要绑定在某个元素里才能进行模拟，不巧，对于安卓手机来说，大部份 `scroll` 事件都是绑定在 `window` 对象下的。这就非常尴尬了，需要借助到 `jsdom` 的功能。通过 `jest-environment-jsdom`，它能够将 `jsdom` 注入到 `node` 运行环境中，因此你可以在测试文件中直接使用 `window`对象进行模拟。例如下面代码，模拟滚动到最底部：

```js
test("scroll to bottom", done => {
  const wrapper = mount(<Wrapper />);

  window.addEventListener("scroll", function(e) {
    setTimeout(() => {
      try {
        // expect 逻辑
        done();
      } catch (err) {
        done.fail(err);
      }
    }, 100);
    jest.runAllTimers();
  });

  let scrollTop = 768;
  window.document.body.scrollTop = scrollTop; // 指明当前 scrollTop到了哪个位置
  window.dispatchEvent(
    new window.Event("scroll", {
      scrollTop: scrollTop
    })
  );
});
```
