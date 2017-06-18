最近笔者在写论文之余重构了 爬虫、create-react-boilerplate 包含的 React 常见开发模式、样式风格与性能优化案例、基于 React、React Router V4、antd、MobX 的后台管理模板等项目。

没有人有义务透过你邋遢的外表去发现你美丽的心灵

笔者在完成第一版本的 fluent_fetcher 之后，发现整个文件冗长而丑陋；在团队内部尝试推广时也无人愿用，包括自己过了一段时间再拾起这个库也觉得很棘手。

笔者认为最理想的情况是使用任何第三方框架之前都能对其源代码有所了解，像 React、Spring Boot、TensorFlow 这样比较复杂的库，我们可以慢慢地拨开它的面纱。而对于一些相对小巧的工具库，出于对自己负责、对团队负责的态度，在引入之前还是要了解下它们的源码组成，了解有哪些文档中没有提及的功能或者潜在风险。

好的代码，好的 API 设计确实应该如白居易的诗，浅显易懂而又韵味悠长。开源项目本身也意味着一种责任，如果是单纯地为了炫技而提升了代码的复杂度却是得不偿失。

在编写 declarative-crawler 的时候，笔者又用到了 fluent-fetcher，看着如乱麻般的代码，我不由沉思，为什么当时会去封装这个库？为什么不直接使用 fetch。

OkHttp、super-agent、request，

就如笔者在 [2016] 一文中介绍的，框架本身是对于复用代码的提取或者功能的扩展，其会具有一定的内建复杂度。如果内建复杂度超过了业务应用本身的复杂度，那么引入框架就不免多此一举了。

- 提取公共处理代码
- 添加扩展功能：譬如重试、超时返回、缓存、Mock 等等

那么之前框架的问题在于：
- 模糊的文档
- 接口的不一致与不直观，默认参数，是使用对象结构还是函数的默认参数
到底是使用 (opt = {}) ，还是使用 ( )
- 过多的潜在抽象漏洞：将 Error 对象封装了起来
- 模块独立性的缺乏：很多的项目都希望能提供尽可能多的功能，但是这本身也会带来一定的风险。

# 基本使用

## 创建请求

## 请求执行

```javascript
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
```

```javascript
(node:33875) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): FetchError: request to https://test.api.truelore.cn/users?token=144d3e0a-7abb-4b21-9dcb-57d477a710bd failed, reason: unable to verify the first certificate
(node:33875) DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

## 可复用的接口类

# 扩展策略

## Jsonp

## 中断与超时

## 进度反馈

```javascript
function consume(reader) {
  var total = 0
  return new Promise((resolve, reject) => {
    function pump() {
      reader.read().then(({done, value}) => {
        if (done) {
          resolve()
          return
        }
        total += value.byteLength
        log(`received ${value.byteLength} bytes (${total} bytes in total)`)
        pump()
      }).catch(reject)
    }
    pump()
  })
}

fetch("/music/pk/altes-kamuffel.flac")
  .then(res => consume(res.body.getReader()))
  .then(() => log("consumed the entire body without keeping the whole thing in memory!"))
  .catch(e => log("something went wrong: " + e))

```

# Contribution

如果我们需要进行本地调试，则可以使用 `npm link` ，首先在当前模块目录下：

```
$ cd package-name
$ npm link
```

然后在使用该模块的目录下：

```
$ cd project
$ npm link package-name
```