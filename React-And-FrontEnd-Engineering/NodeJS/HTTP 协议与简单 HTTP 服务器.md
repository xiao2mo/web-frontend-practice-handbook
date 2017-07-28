# HTTP 协议与 简单 HTTP 服务器

## Reference
- [NodeJS包管理工具——npm入门](http://aerotiger.info/archives/beginners-guide-node-package-manager.html?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)
- [What's the difference between dependencies, devDependencies and peerDependencies in npm package.json file?](http://stackoverflow.com/questions/18875674/whats-the-difference-between-dependencies-devdependencies-and-peerdependencies/22004559#22004559)


# HTTP 协议
HTTP 协议是客户端，也就是浏览器与服务器通信的规范。HTTP/1.0 规范于1996年制定，目前广泛应用的是 HTTP/1.1 规范。

## HTTP 协议简介
HTTP 协议是一种用于客户端和服务端之间通信的协议。其中，发起资源请求的是客户端，而提供资源响应的是服务端。HTTP 协议规定，请求必须由客户端发起，而服务端负责响应请求并返回结果。HTTP 协议是一种无状态协议，这也就意味着不会保存之前的请求或者响应信息，每一次新的请求都会对应着一个新的响应。而在实际使用中，许多网站都需要保存用户信息等数据，用来实现权限控制等等。因此，发展出了 Cookie 和 Session 等技术用来保存和传递状态数据。

TODO
加一张示意图

## HTTP 报文结构
每个 HTTP 请求或者响应都是一个 HTTP 报文，但是请求报文和响应报文拥有不同的结构

### 请求报文
请求报文由请求方法、请求 URI、协议版本、可选请求头和内容实体构成。下面让我们来看一个例子

TODO 例子

常用的请求方法有：
- GET
- POST
- PUT
- DELETE
- OPTIONS
- HEAD

### 响应报文
响应报文由协议版本、状态码、原因短语。可选响应头和响应实体构成

TODO 例子

常见的状态码包括：
- 200 - 成功
- 304 
- 403
- 404
- 500

## 跨域
学习跨域之前首先需要知道浏览器的同源策略，同源策略是所有现代浏览器的基础安全措施之一。同源指的是同协议（protocol）、同域名（host）和同端口（port），一些不符合同源要求的操作都会被禁止。例如无法直接获取 DOM，进行 AJAX 请求等等。
但是在实际应用中，同源策略太过严苛。一些大型的项目往往会使用多个子域名，会用到第三方的存储服务等。这样就无法满足同源策略的要求，相关的请求会被同源策略禁止，为了摆脱这些限制，跨域技术应运而生。常用的跨域手段设置 `document.domain`、JSONP、Websocket、CORS 等等。下面我们来看一个使用 CORS 的例子。

### CORS
CORS 是 Cross-Origin Resource Sharing 的缩写，意为跨域资源共享，它的原理是扩展了 HTTP 协议，增加了一些新的请求头和响应头老控制请求许可。工作原理如下图所示：
![](https://upload.wikimedia.org/wikipedia/commons/c/ca/Flowchart_showing_Simple_and_Preflight_XHR.svg)

通过上图可以发现，跨域请求可以分为两种，一种是简单请求，一种是非简单请求。其中，简单请求需要满足下列两个条件：
1. 除了用浏览器自动设置的请求头外，请求头不超过以下五个字段：`Accept`、`Accept-Language`、`Content-Language`、`Last-Event—ID`、`Content-Type`，其中 `Content-Type` 字段的值必须为以下三种之一： `application/x-www-form-urlencoded`、`multiple/form-data`、`text/plain`
2. 只允许 GET、POST、HEAD 三种方法之一

如果 CORS 请求是简单请求的话，则会直接发送该请求，只在请求头中添加一个 `Origin` 字段，值为请求源的信息（协议 + 域名 + 端口）。如果不是简单请求的话，则会先发送一个预检请求（preflight）,预检请求使用 OPTIONS 方法，请求头中有`Origin`、`Access—Control-Request-Method` 和 `Access-Control-Request—Headers` 字段。
服务端收到简单的 CORS 请求或者预检请求后，会进行判断，如果允许本次 CORS 请求，则在响应头中加上一个 `Access-Control—Allow—Origin` 字段，值为请求源的值或者 `*`，否则就返回一个不包含此响应头的普通 HTTP 响应报文，代表不允许本次 CORS 操作，浏览器检测到之后就是抛出一个错误。

CORS 的原理就介绍这么多，具体实现的话要求客户端和服务端同时支持，其中，客户端也就是浏览器大部分都支持，IE10 以下除外。我们会在下文中介绍如何在服务端进行 CORS 配置。

# 简单 HTTP 服务器
Node.js 中提供了一个核心模块 `http`，可以用来创建 HTTP 服务器或者客户端，首先，使用 `http.createServer()` 方法创建一个服务器实例：
```
const http = require('http');

const server = http.createServer((request, response) => {
    
    // 回调方法

});
```
创建服务器需要一个回调方法，接收 `req` 和 `res` 两个对象作为参数，分别代表一次 HTTP 请求和对应的响应。我们需要做的，就是根据本次请求，来给出响应的响应，例如：
```
// index.js
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
}).listen(3000);
```
安装好 Node.js 之后，在 `index.js` 所在的目录执行 `node index.js` 命令，一个最简单的 HTTP 就搭建完成了。打开浏览器，在地址栏里输入 localhost:3000，就可以看到 Hello World! 的网页了。
在上面的例子中，我们只对响应做了处理，首先使用 `res.writeHead()` 方法设置了响应状态码 `200`，响应头中的字段 `Content-Type` 为 `text/html`。当然，你也可以设置其他的状态码和响应头。`res.end()` 方法是最后一次向相应实体中写内容的机会，接着就会本次 HTTP 响应返回客户端。相似的方法还有 `res.write()`，这个方法只写内容，不返回响应。

# 在 Chrome 中调试 NodeJS 应用

NodeJS 在 6.3.0 版本之后允许使用 Chrome 来调试 NodeJS 应用，从而方便了开发者进行断点调试与单步运行，以及对堆栈信息进行查看。安装好 node 之后我们可以使用`--inspect`选项来运行应用：
```
node --inspect index.js
```
我们也可以选择直接从第一行代码开始进行断点调试：
```
node --inspect --debug-brk index.js
```
运行上述命令之后，控制台中会返回该应用对应的 Chrome 开发工具链接，譬如：
```
chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/69beb5d3-2b1c-4513-aa4b-78d1eb1865ea
```
在 Chrome 中直接打开该链接，即可开始调试：
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2017/1/3/QQ20170125-0123.png)
