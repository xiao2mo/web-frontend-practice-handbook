[![返回目录](https://parg.co/UY3)](https://parg.co/U0I) 





# 基于 Express 的渲染服务器


# renderToString


React 提供了两个方法 `renderToString` 和 `renderToStaticMarkup` 用来将组件(Virtual DOM)输出成 HTML 字符串，这是 React 服务器端渲染的基础，它移除了服务器端对于浏览器环境的依赖，所以让服务器端渲染变成了一件有吸引力的事情。这两个方法被包含在了 react-dom 仓库中，可以通过如下方式引入与使用：
```
import ReactDOMServer from 'react-dom/server';

var ReactDOMServer = require('react-dom/server');

ReactDOMServer.renderToString(element);

```
我们可以在服务端即使用`renderToString`将组件转化为 HTML 标签然后传递给客户端，这里 React 会自动为标签进行校验和计算；这样我们在客户端调用 `ReactDOM.render()` 渲染某个组件时，如果 React 发现已经存在了服务端渲染好的标签，则会直接使用这些标签来节约渲染时间。ReactDOMServer 中提供的另一个渲染函数是`renderToStaticMarkup`，其很类似于`renderToString`，不过其忽略了额外的譬如`data-reactid`这样的 React 内部使用的非 HTML 标准属性；如果你只想把 React 作为简单的静态网页生成器，那么推荐使用这种方式，会帮你避免额外的带宽消耗。












服务器端渲染除了要解决对浏览器环境的依赖，还要解决两个问题：


- 前后端可以共享状态

- 前后端路由可以统一处理





# 状态传递
# 路由权限控制


```
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from './routes'


serve((req, res) => {
  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      res.status(200).send(renderToString(<RouterContext {...renderProps} />))
    } else {
      res.status(404).send('Not found')
    }
  })
})
```


# 代码混淆
> 
- [Protect your DOM from third-party tampering.](https://github.com/elierotenberg/react-armor)


# 避免 XSS 漏洞




笔者一直是坚定地React技术栈的使用者，因此也会关注React应用安全相关的话题。笔者在我自己的[React+Redux+Webpack2](https://github.com/wxyyxc1992/Webpack2-React-Redux-Boilerplate)脚手架的第三层级也使用了大量的服务端渲染/同构直出的技术，而本文即是阐述该方法可能存在的某个XSS漏洞。服务端渲染即允许我们在服务端进行HTML渲染，并且在服务端请求部分应用数据追加到页面上然后随着页面一起返回给用户，从而减少用户的首屏等待时间，并且对于搜索引擎有更友好的优化。
不过如果有安全背景的朋友肯定已经能够察觉到问题了，直接将数据不经过滤地放到页面上势必会带来潜在的安全问题，譬如我们最常用的[同构页面的代码](https://github.com/wxyyxc1992/Webpack2-React-Redux-Boilerplate/blob/master/dev-config/server/template.js):
```
export default (html, initialState = {}, scripts = [], styles = []) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        ${styleMapper(styles)}
      </head>
      <body>
        <div id="root">${html}</div>        
      </body>
      ${scriptMapper(scripts)}
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
    </html>
  `;
};
```
我们直接使用`JSON.stringfy`将JavaScript对象转化为了JSON字符串，然后以全局变量的方式插入到了页面中。不过如果你要序列化的对象是如下这样呢:
```
{
  user: {
    username: "NodeSecurity",
    bio: "as</script><script>alert('You have an XSS vulnerability!')</script>"
  }
}
```
你就会很开心的看到你得到了某个弹窗。关于XSS的知识点笔者不在这里赘述，虽然我们的后台开发人员肯定也在他们的接口层与数据库层完成了敏感字段过滤，不过千里之堤毁于蚁穴，我们不能放过任何一处有可能产生问题的地方。
对于XSS的防御也并不是新鲜的话题，著名的[Open Web Application Security Project](https://www.owasp.org/index.php/About_OWASP)项目就为我们提供了很多关于[防止XSS攻击](https://www.owasp.org/index.php/XSS_%28Cross_Site_Scripting%29_Prevention_Cheat_Sheet)的建议，概括而言，我们需要在应用中做到如下几点:
- 所有的用户输入都需要经过HTML实体编码，这里React已经帮我们做了[很多](https://facebook.github.io/react/docs/introducing-jsx.html#jsx-prevents-injection-attacks)，它会在运行时动态创建DOM节点然后填入文本内容(你也可以强制设置HTML内容，不过这样比较危险)
- 当你打算序列化某些状态并且传给客户端的时候，你同样需要进行HTML实体编码


Yahoo的工程师已经提供了一个[Serialize JavaScript](https://github.com/yahoo/serialize-javascript)模块帮我们轻松地进行JSON转码与过滤，我们可以直接使用`npm install --save serialize-javascript`导入该模块，然后使用`serialize`方法替代内置的`JSON.stringify`方法:
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/11/3/4/1-QDimeM9vPjsDog9damKU1Q.png)