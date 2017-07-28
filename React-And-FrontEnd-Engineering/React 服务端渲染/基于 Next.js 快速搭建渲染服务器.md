# 基于 Next.js 快速搭建渲染服务器

## 简介
Next.js是一个用于React应用的极简的服务端渲染框架。框架中集成了Webpack，Babel等一系列React相关的工具并进行了默认的配置。因此省去了复杂的配置过程，实现了一键搭建开发环境和打包构建。同时提供了自定义配置接口，可以在默认配置的基础上对工具进行自定义配置，满足个性化需求。

## 基本用法

### 安装
使用npm安装：
`npm install next --save`

为了方便的使用next提供的命令，把命令写在`package.json`文件的`scripts`中：
```
{
  "scripts": {
    "dev": "next",  // 运行开发服务器，并监控源代码，具备hod reload功能
    "build": "next build", // 以生产模式打包代码
    "start": "next start"  // 启动Next服务器，可以自定义服务器和端口
    "init": "next init" // 初始化项目，创建基础的文件夹和index页面文件
  }
}
```

之后，在项目的根目录下创建`pages`文件夹和`static`文件夹，分别用来放对应的页面资源和静态资源。

***Note***：也可以使用`npm run init`命令自动生成。

### 运行
如果使用`npm run init`命令的话，现在`pages`文件夹下已经有了`index.js`文件，如果是手动创建`pages`文件夹的话，现在在该文件下创建一个`index.js`文件，内容为：
```
export default () => <p>Hello, world</p>
```

接着执行`npm run dev`命令并在浏览器中打开`http://localhost:3000`。

现在，就得到了一个采用服务端渲染的极简React应用，这个应用还实现了自动代码分割，保证每个页面只会加载自身的依赖，不会有依赖冗余。

Next的核心就是`pages`和`static`文件夹。其中`pages`文件夹用于存放每个页面的顶层组件，`static`用于存放项目中的静态资源。

Next会将`pages`中的文件结构自动映射为对应的路由结构，例如现在该文件夹下有两个文件:`pages/index.js`和`pages/about.js`。则对应的路由分别为`/`和`/about`。并且支持多级目录，例如`page/foo/bar.js`对应的路由为`/foo/bar`。

`static`文件夹用来存放静态文件，例如现在有一个图片文件`static/image.png`，使用的时候引用`/static/image.png`就可以了：
```
export default () => (
  <img src="/static/mage.png" />
)
```

打包完成后，Next会在项目根目录生成一个`.next`文件夹，其中的两个文件夹`dist`和`bundles`，`dist`文件夹中存放着编译后的源代码，用于服务端渲染。`bunldes`文件夹中存放着`pages`中每个页面打包后的整体代码的JSON格式。在应用的初始页面，会使用`dist`文件夹中的代码进行服务端渲染，而其他使用路由到达的页面，则将`bundles`文件夹中的对应JSON格式的代码返回客户端执行渲染。

Next的出现大大简化了React应用开发的配置和构建工作，使开发者能够专注于组件的开发，而不需要在Webpack，Babel等工具上花费过多的精力。基于简单的文件系统，就可以创建包含路由功能和服务端渲染的React应用。需要注意的是：创建的应用中只有初始页面采用服务端渲染，其他通过路由操作到达的页面均为客户福渲染。

## 组件
Next对React组件的`getInitialProps`生命周期方法做了改造，传入一个上下文对象，该对象在服务端渲染和客户端渲染时，具有不同的属性：
- req: HTTP请求对象（服务端渲染独有）
- res: HTTP响应对象（服务端渲染独有）
- pathname: URL中的路径部分
- query：URL中的查询字符串部分解析出的对象
- err：错误对象，如果在渲染时发生了错误
- xhr：XMLHttpRequest对象（客户端渲染独有）

因此，可以在组件的`getInitialProps`方法中处理上下文对象，控制传入组件的`props`数据。例如：
```
import React from 'react'
export default class extends React.Component {
  static async getInitialProps ({ req }) {
    return req
      ? { userAgent: req.headers['user-agent'] }
      : { userAgent: navigator.userAgent }
  }
  render () {
    return <div>
      Hello World {this.props.userAgent}
    </div>
  }
}
```
上面的例子根据是否有req对象来判断是服务端渲染还是客户端渲染，然后采用对应的方式取得用户代码数据并传入组件的`props`中。

### 获取数据
组件的`getInitialProps`还可以用来获取数据：
```
import React, { Component } from 'react';
import 'isomorphic-fetch';

export default class extends Component {
  static async getInitialProps() {
    const res = await fetch('https://api.github.com/repos/zeit/next.js');
    const json = await res.json();
    return { 
      stars: json.stargazers_count 
    };
    
  }
  
  render() {
    return <div>{this.props.stars}</div>
  }
}
```
需要注意的一点是，`getInitialProps`方法执行完毕之后，才会执行组件的`render`方法。这也就导致了如果网络状况不佳的情况下，会出现长时间的等待。并且只有每个页面的顶层组件的`getInitialProps`会被执行，所以想在子组件中获取数据的话只能在其他生命周期函数例如`componentDidMount`配合组件的`state`实现：
```
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: 0
    }
  }

  async componentDidMount() {
    const res = await fetch('https://api.github.com/repos/zeit/next.js');
    const json = await res.json();
    this.setState({
      stars: json.stargazers_count
    });
  }
  
  render() {
    return <div>{this.state.stars}</div>
  }
}
```

### CSS
NEXT组件中声明CSS，目前主要有两种方式：
1. 内嵌CSS
2. CSS-in-JS

#### 内嵌（Built-in）CSS
Next采用的内嵌CSS方案是`styled-jsx`库，也是Next所推荐的CSS声明方式。优点是具有组件级的独立作用域，避免了样式污染问题。并且支持完整的CSS功能，如`:hover`等。
```
import React from 'react'

export default () => (
  <div>
    Hello world
    <p>scoped!</p>
    <style jsx>{`
      p {
        color: blue;
      }
      div {
        background: red;
      }
      div:hover {
        background: blue;
      }
      @media (max-width: 600px) {
        div {
          background: blue;
        }
      }
    `}</style>
  </div>
)
```

#### CSS-in-JS
Next支持多种CSS-in-JS方案，例如基本的在组件`style`属性中写样式：
```
import React from 'react'

export default () => (
  <div style={{color: red}}>
    Hello world
  </div>
)

```

还有其他的CSS-in-JS库，可以根据自己的需要和喜好灵活选择。
## 路由系统

### `Link`组件
Next中提供了一个<Link>组件，用来实现路由功能。例如，我们的应用有两个页面：`pages/index.js`和`pages/about.js`，想要实现页面跳转，只需要：
```
// pages/index.js
import Link from 'next/link'
export default () => (
  <div>Click <Link href="/about"><a>here</a></Link> to read more</div>
)
```
```
// pages/about.js
export default () => (
  <p>Welcome to About!</p>
)
```
`<Link>`组件的工作流程和浏览器很相似：
1. 获取新的组件
2. 如果新组件定义了`getInitialProps`，则获取数据，如果发生错误，则渲染`_error.js`
3. 步骤1，2完成之后，执行`pushState`并渲染新组件

每个顶层组件中还会传入一个`url`对象，提供了几个路由相关的方法：
- pathname：`String`-当前URL不包括查询字符串的path部分
- query：`Object`-当前URL中查询字符串解析成的对象
- back-后退
- push(url, as=url)-使用传入的`url`（字符串）执行`pushState`操作
- replace(url, as=url)-使用传入的`url`（字符串）执行`replaceState`操作
***注意***：`push`和`replace`方法中的第二个参数`as`为可选项，只有在服务端配置了自定义路由才有作用。

### `Router`对象

除了使用`<Link>`组件之外，Next还提供了一个`Router`对象满足命令式写法的需要：

```
import Router from 'next/router'

export default () => (
  <div>Click <span onClick={() => Router.push('/about')}>here</span> to read more</div>
)
```
与`url`对象相比，`Router`对象多了一个`route`属性，值为当前的路由。
需要注意的是，`Router`对象中的属性和方法仅可以在客户端部分使用，服务端渲染的页面无法使用，否则会报错。

### 路由事件
`Router`对象还提供了三个路由事件方法：
- routeChangeStart(url) - 路由变化开始时触发
- routeChangeComplete(url) - 路由变化完成时触发
- routeChangeError(err, url) - 路由变化发生错误时触发
如果使用`Router.push(url, as)`或相似的方法并传入了`as`参数，则路由事件方法中的`url`参数值为`as`的值，否则，`url`参数的值是路由舔砖目标的URL

***注意***：与`Router`对象中其他的属性和方法不同的是，这三个路由事件方法可以在服务端渲染的页面使用。

监听路由变化：
```
Router.onRouteChangeStart = (url) => {
  console.log('App is changing to: ', url)
}
```

取消监听：
```
Router.onRouteChangeStart = null;
```

如果路由加载取消了（连续快速点击两个链接），就会触发`routeChangeError`的回调，传入的`err`参数中将包含一个`cancelled`属性，值为`true`。
```
Router.onRouteChangeError = (err, url) => {
  if (err.cancelled) {
    console.log(`Route to ${url} was cancelled!`)
  }
}
```

## 预获取页面
Next提供了一个基于`ServiceWorker`实现的，具有预获取页面功能的模块：`next/prefetch`。
使用预获取功能，可以使APP预加载那些可能到达的页面，提升网站的使用体验和性能。当然，前提是你的浏览器必须支持`ServiceWorker`。并且预获取功能只支持应用内的页面，不支持外部链接。

### `<Link>`组件
`next/prefetch`模块也提供了一个具有预获取功能的`<Link>`组件，代替路由系统中的`<Link>`组件，使用方法一致：
```
import Link from 'next/prefetch'

export default () => (
  <nav>
    <ul>
      <li><Link href='/'><a>Home</a></Link></li>
      <li><Link href='/about'><a>About</a></Link></li>
      <li><Link href='/contact'><a>Contact</a></Link></li>
    </ul>
  </nav>
)
```

此外预获取功能可以精确控制到每个`<Link>`标签，使用`prefetch`属性来控制开关：
```
<Link href='/contact' prefetch={false}><a>Home</a></Link>
```

### `prefetch`方法
和路由器一样，预获取模块也提供了一个`prefetch`方法，用来方便命令式的写法：
```
import { prefetch } from 'next/prefetch'
export default ({ url }) => (
  <div>
    <a onClick={ () => setTimeout(() => url.pushTo('/dynamic'), 100) }>
      100ms后执行路由跳转
    </a>
    {
      预获取页面
      prefetch('/dynamic')
    }
  </div>
)
```

## 自定义配置
如果默认的配置无法满足需要的话，Next还提供了诸多的自定义配置接口，可以根据自己的需求灵活配置。

### 自定义服务器和路由
默认的服务器和路由系统可能无法满足需要，比如，我需要把`/a`的路由解析到`pages/b.js`，把`/b`的路由解析到`pages/a.js`，此时，就需要通过自定义，手动控制页面渲染来实现，在项目根目录下创建`server.js`文件：
```
// server.js

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/a') {
      app.render(req, res, '/b', query)
    } else if (pathname === '/b') {
      app.render(req, res, '/a', query)
    } else {
      handle(req, res, parsedUrl)
    }
  })
  .listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
```
你可以选择自己喜欢的服务端框架，`express`或者`koa`等，进行自定义。

### 自定义`<head>`
Next提供了`<HEAD>`组件，可以自定义页面`<head>`标签中的内容。每个组件都可以在内部自定义`<head>`的内容：
```
import Head from 'next/head'
export default () => (
  <div>
    <Head>
      <title>My page title</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <p>Hello world!</p>
  </div>
)
```
每个页面组件只需要定义本页面需要的`<head>`内容，并且对于相同的标签，例如`<title>`。会按照组件渲染的顺序，后定义的覆盖先定义的内容。


### 自定义`<Document>`
在前面的例子中，服务端渲染时，所有的页面我们只需要写内容组件，这是因为使用了默认的`<Document>`模板。当然，可以自定义自己的服务端渲染模板。首先，创建`pages/_document.js`文件，写上内容：
```
// pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const props = await Document.getInitialProps(ctx)
    return { ...props, customValue: 'hi there!' }
  }

  render () {
    return (
     <html>
       <Head>
         <style>{`body { margin: 0 } /* custom! */`}</style>
       </Head>
       <body className="custom_class">
         {this.props.customValue}
         <Main />
         <NextScript />
       </body>
     </html>
    )
  }
}
```
其中的`ctx`对象与其他组件中的`getInitialProps`方法中收到的参数一样，只不过多了一个额外的方法：`renderPage()`。


### 自定义错误处理
Next中，有一个默认组件`error.js`，负责处理404或者500这种错误。当然，你也可以自定义一个`_error.js`组件覆盖默认的错误处理组件：
```
// _error.js

import React from 'react'
export default class Error extends React.Component {
  static getInitialProps ({ res, xhr }) {
    const statusCode = res ? res.statusCode : (xhr ? xhr.status : null)
    return { statusCode }
  }

  render () {
    return (
      <p>{
        this.props.statusCode
        ? `An error ${this.props.statusCode} occurred on server`
        : 'An error occurred on client'
      }</p>
    )
  }
}
```


### 自定义配置
相对Next进行自定义配置的话，可以在项目根目录下创建一个`next.config.js`
```
// next.config.js

module.exports = {
  /* 自定义配置 */
}
```

#### 自定义Webpack配置
在创建好的`next.config.js`文件中，可以扩展Webpack配置：
```
module.exports = {
  webpack: (config, { dev }) => {
   
    // 修改config对象
   
    return config
  }
}
```
该函数接收默认的Webpack config对象作为参数，返回修改后的config对象。需要注意的是，`next.config.js`文件会被直接执行，因为只能使用本机安装的Node.js所支持的JS语法。

***警告***：**不建议**在自定义Webpack配置中添加loader以支持新的文件类型！因为只有客户端渲染的代码会经过打包，而服务端执行的是源代码，并没有经过Webpack处理，因此新的loader对服务端渲染不起作用。所以最好是使用Babel插件来处理新的文件类型，因为无论是客户端还是服务端渲染的代码，都会经过Babel处理。

#### 自定义Babel配置
自定义Babel配置，只需要在项目根目录下创建`.babelrc`文件，因为自定义配置会覆盖默认配置，而不是扩展默认配置。因此需要把next preset写到`.babelrc`中。例如：
```
{
  "presets": [
    "next/babel",  // Next默认配置
    "stage-0"
  ],
}
```

### 产品部署
生产模式下，需要先使用生产模式构建代码，再启动服务器。因此，需要两条命令：
```
next build
next start
```
Next官方推荐使用[`now`](https://zeit.co/now)作为部署工具，只要在`package.json`文件中写入：
```
{
  "name": "my-app",
  "dependencies": {
    "next": "latest"
  },
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```
接着运行`now`命令，就可以实现一键部署。

### Reference
> [Next.js](https://zeit.co/blog/next)

> [README.md](https://github.com/zeit/next.js#with-link-1)
