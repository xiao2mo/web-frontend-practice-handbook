# Webpack 
Webpack 作为模块打包工具，极大地简化了前端的开发打包流程，笔者认为其为前端工程化做出了不可磨灭的贡献。2017 年初，Webpack 2.2 正式版本发布，相较于 1.0 版本中不论在社区文档还是功能实现上都有了长足的进步。Webpack同时担负着构建系统与模块打包的功能，Webpack 会将你的所有的资源当做模块进行处理。Webpack会将所有的资源文件，包括样式文件、图片等进行统一导入：

``` javascript
import stylesheet from 'styles/my-styles.scss';
import logo from 'img/my-logo.svg';
import someTemplate from 'html/some-template.html';

console.log(stylesheet); // "body{font-size:12px}"
console.log(logo); // "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5[...]"
console.log(someTemplate) // "<html><body><h1>Hello</h1></body></html>"

```
市面上已经存在的模块管理和打包工具并不适合大型的项目，尤其单页面 Web 应用程序。最紧迫的原因是如何在一个大规模的代码库中，维护各种模块资源的分割和存放，维护它们之间的依赖关系，并且无缝的将它们整合到一起生成适合浏览器端请求加载的静态资源。这些已有的模块化工具并不能很好的完成如下的目标：

- 将依赖树拆分成按需加载的块
- 初始化加载的耗时尽量少
- 各种静态资源都可以视作模块
- 将第三方库整合成模块的能力
- 可以自定义打包逻辑的能力
- 适合大项目，无论是单页还是多页的 Web 应用

## Reference
- [Webpack 中文社区](https://doc.webpack-china.org/)
- [Getting Started with webpack 2](https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783#.3ksiast1f)
- [Intro To Webpack](https://medium.com/@kimberleycook/intro-to-webpack-1d035a47028d?source=linkShare-fe48c4221a4c-1482154145)

# JavaScript 模块系统

# 模块打包工具

在前端模块化尚未流行的年代里，每个 HTML 文件的尾部都会挂载很多的`script`标签来载入 JavaScript 代码，各个文件之间的依赖异常混乱，项目的可维护性随着代码的增加而迅速降低，整个应用的开发流程中也尚未有专门的编译流程。后来出现了以 Grunt/Gulp 为代表的所谓的 Task Runner，允许开发者在项目中配置一些自动化的任务以便捷进行文件合并、代码压缩、后处理等操作，不过 Task Runner 存在的问题在于其不能够去真正的自动化解析依赖，并且对于 HTML、CSS、JavaScript 这些不同类型的资源文件只能分割独立地处理，无形会大大拉低开发部署的速度。
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2017/2/1/1-yBt2rFj2DbckFliGE0LEyg.png)
虽然类似于 Gulp 这样的 Task Runner 也能添加很多的预处理器或者转换器，但是本质上它仍然需要指定元输入。而 Webpack 最早的动因即是希望能够让开发工具自己去处理模块依赖问题，开发者不需要再为每一个任务去指定输入输出：
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2017/2/1/1-TOFfoH0cXTc8G3Y_F6j3Jg.png)
综上所述，Webpack 具有如下优点：
- 代码拆分：Webpack 有两种组织模块依赖的方式，同步和异步。异步依赖作为分割点，形成一个新的块。在优化了依赖树后，每一个异步区块都作为一个文件被打包。
- Loader：Webpack 本身只能处理原生的 JavaScript 模块，但是 loader 转换器可以将各种类型的资源转换成 JavaScript 模块。这样，任何资源都可以成为 Webpack 可以处理的模块。
- 智能解析：Webpack 有一个智能解析器，几乎可以处理任何第三方库，无论它们的模块形式是 CommonJS、 AMD 还是普通的 JS 文件。甚至在加载依赖的时候，允许使用动态表达式 `require("./templates/" + name + ".jade")`。
- 插件系统：Webpack 还有一个功能丰富的插件系统。大多数内容功能都是基于这个插件系统运行的，还可以开发和使用开源的 Webpack 插件，来满足各式各样的需求。
- 快速运行：Webpack 使用异步 I/O 和多级缓存提高运行效率，这使得 Webpack 能够以令人难以置信的速度快速增量编译。Webpack是笔者见过的最强大的模块管理器与编译工具，他不仅仅同时支持CMD与AMD模式，也能实时编译JSX、ES6等语法，还能将CSS、图片等资源文件都进行打包。

除了 Webpack 之外，还有很多其他优秀的模块打包工具，譬如 Browserify、Rollup.js 等。Rollup.js 由 Rich Harris 开发并且开源，其发布之处主打的特性是支持所谓的 TreeShaking，仅在最后的生成包体中仅包含使用到的代码而并非全部代码都打包进来。在 Webpack 1 中其并未支持 ES6 的`imports`与`exports`语法，而是需要转化为`var module = require('module')`；不过在 Webpack 2 中其已经能够原生支持 ES6 模块的语法，意味着可以引入像 TreeShaking 这样的模块优化机制了。我们以一个简单的例子来介绍 TreeShaking 的机制，假设我们的应用包含两个文件：index.js 与 module.js, 在后者中我们导出了两个辅助函数：
```
// module.js 
export const sayHello = name => `Hello ${name}!`; 
export const sayBye = name => `Bye ${name}!`
```
而在 index.js 中我们仅引入了`sayHello`函数：
```
// index.js 
import { sayHello } from './module'; 
sayHello('World');
```
虽然我们同样暴露了`sayBye`这个函数，但是从未使用过，那么基于 TreeShaking 优化机制，最后的打包文件如下所示：
```
// bundle.js 
const sayHello = name => `Hello ${name}!`; 
sayHello('World');
```
通过这个小例子相信大家能够明白 TreeShaking 的机制，形象化来考虑，我们将应用看做某个依赖关系图谱，也就是一棵依赖树，每个 export 都可以看做一根树枝。我们通过摇晃这棵树来让那些没有使用的、假死状态的树枝脱落。在 Webpack 中我们往往使用`babel-loader`来转换所有的 JavaScript 文件使其能够运行在较低版本的浏览器上，不过同样其会将 ES6 的模块语法转化为 AMD 或者 CommonJS 规范等，我们需要在 Webpack 2 中进行如下配置来避免 Babel 对模块语法进行转换：
```
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: { filename: 'bundle.js', path: 'dist' },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { 
          presets: [ 
            [ 'es2015', { modules: false } ] 
          ] 
        }
      }
    ]
  },
  plugins: [ new HtmlWebpackPlugin({ title: 'Tree-shaking' }) ]
};
```
另一个笔者想提到的所谓小模块问题，模块打包工具能够有效地帮我们自动处理模块之间的依赖关系，不过因为现在我们在进行模块打包的同时会进行大量的转换或者 Polyfill 的工作，导致了模块过多时最终的生成包体中会包含大量的胶水代码。譬如我们编写了两个简单的模块仅仅会导出一些常量：
```
// index.js
var total = 0
total += require('./module_0')
total += require('./module_1')
total += require('./module_2')
// etc.
console.log(total)
// module_0.js
module.exports = 0
// module_1.js
module.exports = 1
```
我们如果使用 Browserify  或者 Webpack 进行打包，其会将每个模块包裹进独立的函数作用域中，然后声明一个顶层的运行时加载器，譬如上述代码在 Browserify 中的打包结果如下：
```
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = 0
},{}],2:[function(require,module,exports){
module.exports = 1
},{}],3:[function(require,module,exports){
module.exports = 10
},{}],4:[function(require,module,exports){
module.exports = 100
// etc.
```
而 Rollup 或者 Closure 打包的结果看起来会舒适很多：
```
(function () {
        'use strict';
        var module_0 = 0
        var module_1 = 1
        // ...
        total += module_0
        total += module_1
        // etc.
```
不过在大量模块的情况下，任何一种打包工具包体的增长速度会随着模块数的增长而变大：
| Bundler              | 100 modules | 1000 modules | 5000 modules |
| -------------------- | ----------- | ------------ | ------------ |
| browserify           | 7982        | 79987        | 419985       |
| browserify-collapsed | 5786        | 57991        | 309982       |
| webpack              | 3955        | 39057        | 203054       |
| rollup               | 1265        | 13865        | 81851        |
| closure              | 758         | 7958         | 43955        |
| rjs                  | 29234       | 136338       | 628347       |
| rjs-almond           | 14509       | 121612       | 613622       |


# Webpack 配置
本书中使用 Webpack2.2版本
配置Webpack，首先在项目根目录下创建一个 `webpack.config.js` 配置文件，这是 Webpack 的默认配置文件查找路径。如果想把配置文件放在别的目录，则需要在使用Webpack命令时声明配置文件的位置。配置文件需要输出一个对象，其中声明配置：
```
// webpack.config.js

module.exports = {

    // 配置项

}
```

Webpack 的配置项繁多，在这里只介绍四个最核心，最常用的配置项，其他配置项可以在需要的时候再去查阅。

## entry
entry是项目的入口，Webpack会从入口文件开始，分析依赖，构造依赖树，并最终打包在一起。
entry有三种形式，字符串，数组和对象，分别代表了不同的打包方式：
- 字符串形式。单入口，打成一个包。
```
entry: './home.js'  

```
- 数组形式。多入口，打成一个包，前提是各个入口的依赖树相互独立，不会彼此依赖。
```
entry: ['./a.js', './b.js']

```
- 对象形式。多入口，打成多个包，适合多页面应用（不是多页面的SPA），可以同时使用字符串形式和数组形式。
```
entry: {
    home: './home.js',
    profile: ['./a.js', './b.js']
}
```

## output
output的作用是告诉Webpack如何存储生成的结果文件，决定了打包好的文件放在哪里，文件名是什么。`output` 对象有以下几个核心的属性：

### filename 
该选项决定了打包后的文件名，对于单入口的时候，可以是一个静态文件名：
```
filename: 'bundle.js'
```
但是在多个入口时，为了区别打包生成的多个文件，需要在 `filename` 中用到占位符：
```
filename: "[name].bundle.js"              // 入口名[name]

filename: "[id].bundle.js"                // 内部生成的chunk id [id]

filename: "[name].[hash].bundle.js"       // 每次构建生成的唯一hash值 [hash]

filename: "[chunkhash].bundle.js"         // 根据chunk内容生成的hash值 [chunkhash]

```
另外，还可以是文件夹结构，例如：
```
filename: "js/[name]/bundle.js"
```
### path
path的作用是决定打包后的文件存放的位置，值应当是一个绝对路径：
```
path: path.resolve(__dirname, 'dist')

```

### publicPath
`publicPath` 对于按需加载和加载外部资源非常的重要，如果配置错误的话，会导致外部资源加载失败，导致404错误。
Webpack会把`publicPath` 的值作为前缀，添加到打包过程中或者 `loader` 创建的 URL 上，该值可以是相对路径（相对于 HTML 文件的位置），也可以是绝对路径。例如：
```
publicPath: "https://cdn.example.com/assets/", // CDN (always HTTPS)
publicPath: "//cdn.example.com/assets/", // CDN (same protocol)
publicPath: "/assets/", // server-relative
publicPath: "assets/", // relative to HTML page
publicPath: "../assets/", // relative to HTML page
publicPath: "", // relative to HTML page (same directory)
```
此外，在使用 `webpack-dev-server` 时，该路径也会作为打包输出的文件在服务器上的路径。因此可以通过 `publicPath` 的值来引用打包好的文件。例如：
```
filename: 'bundle.js',
publickPath: '/assets/'
```
在 HTML 文件中引用：
```
<script src="/assets/bundle.js">
```

## module
`module` 对象用来配置模块的解析，对不同的文件类型需要采用不同的 `loader` ,所有的加载规则都写在 `module` 对象的 `rule` 属性中：
```
modules: {

   rule: [
        {
            test: /\.js[x]?$/,          // 匹配以 .js 或 .jsx 结尾的文件
             use: ['babel-loader'],     // 使用 babel-loader 解析
             exclude: /node_modules/    // node_modules 中的文件不解析
        },
        { test: /\.css$/,               // 匹配以 .css 结尾的文件
          use: [                        // 链式调用 loader, 顺序为 postcss-loader,css-loader,style-loader
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {                    // postcss-loader 的配置选项
                plugins: function() {
                  return [
                    require('precss'),
                    require('autoprefixer')
                  ]
                },
                sourceMap: 'inline'
              }
            }
          ]
   ]
   
}
```
要注意的是，使用多个 `loader` 组成 `loader` 链时，顺序一定不能搞错，否则就会出现错误。

### babel
说到 `loader`，就不得不提到 `babel`。现在已经普遍开始使用ES6的语法和特性编写 JavaScript，而浏览器对 JavaScript 的支持基本还停留在 ES5 时代，为了将 JavaScript 转换为浏览器能够兼容的写法，`babel` 诞生了。使用 `babel`，不仅仅可以使用 ES6 规范的特性，甚至还可以尝试 JSX 和 ES7 的写法。
配置 `babel`，首先要知道两个概念，`preset` 和 `plugin`，`plugin` 通常实现单一功能，例如 ES6 中的块级作用域，箭头函数等等。而 `preset` 则是一系列 `plugin` 的集合，例如，`preset-es2015` 就是 ES6 所有特性插件的集合，包括块级作用域和箭头函数 `plugin`。想要使用 `babel`，首先需要安装对应的 `preset` 和 `plugin`，例如，我想使用 JSX 语法和 ES6 特性。首先，安装这些 `preset`:
`npm install babel-preset-es2015 babel-preset-react --save-dev`
接着，在项目根目录下创建 `.babelrc` 文件：
```
// .babelrc

{
    "presets":  ["es2015", "react"],
    "plugins": [
        // 其他用到的插件
    ]
}
```
这样，Webpack 在用到babel-loader的时候会自动读取 `.babelrc` 文件中的配置，对匹配的文件进行转译。

Webpack 的 `loader` 种类非常丰富，基本可以覆盖所有常见类型的资源，例如处理静态资源的 `url-loader`，处理文件的 `file-loader` 等等。

## plugins
Webpack有着丰富的插件，通过这些插件，可以实现众多有用的功能，例如代码的压缩混淆，抽取出CSS文件等等，下面会介绍几款常用的插件和使用方法。
- CommonChunksPlugin
- HtmlWebpackPlugin
- DefinePlugin

# Webpack Dev Server 与热加载


