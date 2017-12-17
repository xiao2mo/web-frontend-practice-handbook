# Introduction

[React Router](https://github.com/reactjs/react-router)是基于React的同时支持服务端路由与客户端路由的强大易用的路由框架，可以允许开发者方便地添加新页面到应用中，保证页面内容与页面路由的一致性以及在页面之间进行方便地参数传递。之前React Router作者没有积极地开发与审核Pull Request，结果有个[rrtr](https://github.com/taion/rrtr)一怒之下要建个独立的分支，不过后来好像又回归到了React Router上。 目前React-Router的官方版本已经达到了2.6.0，其API也一直在发生变化，笔者在本文中所述内容也是基于2.6.0的官方文档以及自己的实践整理而来。同时，随着React Router项目的更新本文文档也会随之更新，有需要的建议关注本项目。如果你是初学者希望快速搭建React的基本开发环境，那么笔者建议参考[Webpack-React-Redux-Boilerplate](https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate/tree/boilerplate)来迅速构建可应用于生产环境的自动化开发配置。首先，基本的React的路由配置如下所示:

```



<Router history={appHistory}>
    <Route path = "/" component = {withRouter(App)}> //在2.4.0之后建议默认使用withRouter进行包裹
      <IndexRoute component = {withRouter(ClusterTabPane)} /> //默认路由
      <Route path = "cluster" component = {withRouter(ClusterTabPane)} />
    </Route>
    <Route path="*" component={withRouter(ErrorPage)}/> //默认错误路由
  </Router>

```

不过React-Router因为其与React的强绑定性也不可避免的带来了一些缺陷，譬如在目前情况下因为React存在的性能问题(笔者觉得在React-Fiber正式发布之后能得到有效解决)，如果笔者打算使用[Inferno](https://github.com/trueadm/inferno)来替换部分对性能要求较大的页面，也是会存在问题。如果有兴趣的话也可以参考下[你不一定需要React-Router这篇文章](https://medium.freecodecamp.com/you-might-not-need-react-router-38673620f3d#.hzfajjq3t)。



## Why React-Router
### Without React-Router

React-Router的核心原理是将子组件根据选择注入到`{this.props.children}`中。在一个多页面的应用程序中，如果我们不使用React-Router，那么整体的代码可能如下所示:



```

import React from 'react'

import { render } from 'react-dom'



const About = React.createClass({/*...*/})

const Inbox = React.createClass({/*...*/})

const Home = React.createClass({/*...*/})



const App = React.createClass({

  getInitialState() {

    return {

      route: window.location.hash.substr(1)

    }

  },



  componentDidMount() {

    window.addEventListener('hashchange', () => {

      this.setState({

        route: window.location.hash.substr(1)

      })

    })

  },



  render() {

    let Child

    switch (this.state.route) {

      case '/about': Child = About; break;

      case '/inbox': Child = Inbox; break;

      default:      Child = Home;

    }



    return (

      <div>

        <h1>App</h1>

        <ul>

          <li><a href="#/about">About</a></li>

          <li><a href="#/inbox">Inbox</a></li>

        </ul>

        <Child/>

      </div>

    )

  }

})



render(<App />, document.body)

```

可以看出，在原始的多页面程序配置下，我们需要在`render`函数中手动地根据传入的Props来决定应该填充哪个组件，这样就导致了父子页面之间的耦合度过高，并且这种命令式的方式可维护性也比较差，也不是很直观。


### With React-Router

在React-Router的协助下，我们的路由配置可能如下所示:



```

import React from 'react'

import { render } from 'react-dom'



// First we import some modules...

import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'



// Then we delete a bunch of code from App and

// add some <Link> elements...

const App = React.createClass({

  render() {

    return (

      <div>

        <h1>App</h1>

        {/* change the <a>s to <Link>s */}

        <ul>

          <li><Link to="/about">About</Link></li>

          <li><Link to="/inbox">Inbox</Link></li>

        </ul>



        {/*

          next we replace `<Child>` with `this.props.children`

          the router will figure out the children for us

        */}

        {this.props.children}

      </div>

    )

  }

})



// Finally, we render a <Router> with some <Route>s.

// It does all the fancy routing stuff for us.

render((

  <Router history={hashHistory}>

    <Route path="/" component={App}>

      <IndexRoute component={Home} />

      <Route path="about" component={About} />

      <Route path="inbox" component={Inbox} />

    </Route>

  </Router>

), document.body)

```

React Router提供了统一的声明式全局路由配置方案，使我们在父组件内部不需要再去关系应该如何选择子组件、应该如何控制组件间的跳转等等。而如果你希望将路由配置独立于应用程序，你也可以使用简单的JavaScript Object来进行配置:

```

const routes = {

  path: '/',

  component: App,

  indexRoute: { component: Home },

  childRoutes: [

    { path: 'about', component: About },

    { path: 'inbox', component: Inbox },

  ]

}



render(<Router history={history} routes={routes} />, document.body)

```

## Reference

### Tutorials & Docs

- [Beginner’s Guide to React Router](https://medium.com/@dabit3/beginner-s-guide-to-react-router-53094349669#.ccpvbjkxi)

- [you-might-not-need-react-router](https://medium.freecodecamp.com/you-might-not-need-react-router-38673620f3d#.hzfajjq3t)

- [React Router 中文文档](http://react-guide.github.io/react-router-cn/index.html)


# Route Configuration:路由配置
在将React Router集成到项目中之后，我们会使用`Router`对象作为根容器包裹数个Route配置，而Route也就意味着一系列用于指示Router应该如何匹配URL的规则。以简单的TodoAPP为例，其路由配置如下所示:

```js
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

const About = React.createClass({
  render() {
    return <h3>About</h3>
  }
})

const Inbox = React.createClass({
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        {this.props.children || "Welcome to your Inbox"}
      </div>
    )
  }
})

const Message = React.createClass({
  render() {
    return <h3>Message {this.props.params.id}</h3>
  }
})

render((
  <Router>
    <Route path="/" component={App}>
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox}>
        <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
  </Router>
), document.body)
```

根据以上的配置，Router能够智能地处理以下几个路由跳转:

URL                     | Components
------------------------|-----------
`/`                     | `App`
`/about`                | `App -> About`
`/inbox`                | `App -> Inbox`
`/inbox/messages/:id`   | `App -> Inbox -> Message`

### 添加默认路由
在上面的配置中，如果我们默认访问的`/`地址，那么根据React Router的原理此时并没有选定任何的子组件进行注入，即此时的`this.props.children`值为`undefined`。而React Router允许我们使用[`<IndexRoute>`](/docs/API.md#indexroute) 来配置默认路由。
```js
import { IndexRoute } from 'react-router'

const Dashboard = React.createClass({
  render() {
    return <div>Welcome to the app!</div>
  }
})

render((
  <Router>
    <Route path="/" component={App}>
      {/* Show the dashboard at / */}
      <IndexRoute component={Dashboard} />
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox}>
        <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
  </Router>
), document.body)
```
此时整体路由的配置为:
URL                     | Components
------------------------|-----------
`/`                     | `App -> Dashboard`
`/about`                | `App -> About`
`/inbox`                | `App -> Inbox`
`/inbox/messages/:id`   | `App -> Inbox -> Message`

### 将UI与URL解耦
在上面的配置中，Message组件是Inbox的子组件，因此每次访问Message组件都需要在路由上添加`/inbox`，这样会导致随着应用层次的加深而部分路由过于冗长，因此React Router还允许将UI与URL的配置解耦，譬如对上述配置的重构方式就是:
```js
render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox} />

      {/* Use /messages/:id instead of /inbox/messages/:id */}
      <Route component={Inbox}>
        <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
  </Router>
), document.body)
```
这样近似于绝对路径访问的方式能够提高整体路由配置的可读性，我们不需要在URL中添加更多的Segments来访问内部的组件，此时的整体路由配置为:
URL                     | Components
------------------------|-----------
`/`                     | `App -> Dashboard`
`/about`                | `App -> About`
`/inbox`                | `App -> Inbox`
`/messages/:id`         | `App -> Inbox -> Message`

> 注意，绝对路径可能无法使用在动态路由中。

### 重定向路由
React Router提供了[`<Redirect>`](/docs/API.md#redirect)来允许我们将某个路由重定向到其他路由，譬如对于上面的配置中，当我们将Message组件设置为绝对路径访问而部分开发者仍然使用`/inbox/message/:id`方式进行访问时:

```js
import { Redirect } from 'react-router'

render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="about" component={About} />

      <Route path="inbox" component={Inbox}>
        {/* Redirect /inbox/messages/:id to /messages/:id */}
        <Redirect from="messages/:id" to="/messages/:id" />
      </Route>

      <Route component={Inbox}>
        <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
  </Router>
), document.body)
```

此时对于 `/inbox/messages/5`会被自动重定向到`/messages/5`。



### 非JSX方式配置
当我们使用JSX方式进行配置时，其嵌入式的层次结构有助于提高路由的可读性，不同组件之间的关系也能较好地表现出来。不过很多时候我们仍然希望使用单纯的JS对象进行配置而避免使用JSX语法。注意，如果使用单纯的JS对象进行配置的时候，我们无法再使用 `<Redirect>`，因此你只能够在`onEnter`钩子中配置重定向。
```js
const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Dashboard },
  childRoutes: [
    { path: 'about', component: About },
    {
      path: 'inbox',
      component: Inbox,
      childRoutes: [{
        path: 'messages/:id',
        onEnter: ({ params }, replace) => replace(`/messages/${params.id}`)
      }]
    },
    {
      component: Inbox,
      childRoutes: [{
        path: 'messages/:id', component: Message
      }]
    }
  ]
}

render(<Router routes={routes} />, document.body)
```

### NamedComponent:命名组件
在正常的Route项配置中`<Route path="messages/:id" component={Message} />`，在component这个Prop中我们传入的是某个组件名，而如果我们需要在路由配置时动态构造一些组件，譬如我们希望传入标题为`HelloWorld`的`Message`组件时，我们会需要以下配置:
```
const TitledMessage = ()=>{<Message  title="HelloWorld" /> }
```
这里是传入了一个函数式声明的组件，关于函数式声明的组件可以参考[React中函数式声明组件。](https://segmentfault.com/a/1190000006180667)。而React Router官方也提供了我们另一种动态构造组件的方式，即是所谓的NamedComponent，即允许在子路由声明时将Props值作为路由配置参数传入父路由，譬如我们创建了需要传入两个Props参数的组件:
```
const NamedComponents = (props) => (
  <div>
    {props.title}<br />
    {props.subTitle}
  </div>
)
``` 
而NamedComponent需要的两个输入参数其实也是两个可组合的组件:
```
const Title = () => (
  <h1>Hello from Title Component</h1>
)
const SubTitle = () => (
  <h1>Hello from SubTitle Component</h1>
)
```
然后我们可以为NamedComponent组件创建一个单独的路由，而其默认子路由可以是两个组件:
```
<Route path='/namedComponent' component={NamedComponents}>
  <IndexRoute components={{ title: Title, subTitle: SubTitle }} />
</Route>
```
最后的效果如下所示:
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/7/4/1-PkEi-B9wXXssxP81vw2GkQ.jpeg)

# Route Matching:路由匹配

路由主要依靠三个属性来判断其是否与某个URL相匹配:
1. 嵌套的层级
2. 路径
3. 优先级

### Nesting

React Router提供了嵌套式的路由声明方案来表述组件之间的从属关系，嵌套式的路由就好像树形结构一样，而React Router来对某个URL进行匹配的时候也会按照深度优先的搜索方案进行匹配搜索。

### Path Syntax:路径表达式

一个典型的路由路径由以下几个部分组成:
  - `:paramName` – 匹配参数直到 `/`, `?`, or `#`.
  - `()` – 匹配可选的路径
  - `*` – 非贪婪匹配所有的路径
  - `**` - 贪婪匹配所有字符直到 `/`, `?`, or `#`

```js
<Route path="/hello/:name">         // 匹配 /hello/michael and /hello/ryan
<Route path="/hello(/:name)">       // 匹配 /hello, /hello/michael, and /hello/ryan
<Route path="/files/*.*">           // 匹配 /files/hello.jpg and /files/hello.html
<Route path="/**/*.jpg">            // 匹配 /files/hello.jpg and /files/path/to/file.jpg
```

### Precedence:优先级

路由算法自动根据路由的定义顺序来决定其优先级，因此你在定义路由的时候需要注意前一个路由定义不能完全覆盖下一个路由的全部跳转情况:
```js
<Route path="/comments" ... />
<Redirect from="/comments" ... />
```
### Params:参数
####  Route Parameters
很多应用的不可或缺的一个点就是从URL中读取路由参数，React Router自然也为我们提供了路由参数设置与读取的功能，譬如在定义路由时，我们可以直接将参数定义入路由中:
```
<Route path='/about/:name' component={About} />
```
而在需要读取该参数的组件中:
```
const About = (props) => (
  <div>
    <h3>Welcome to the About Page</h3>
    <h2>{props.params.name}</h2>
  </div>
)
```
有时候，我们也需要设置可选参数，譬如如果按照上面的配置方案我们直接访问`/#/about`是无法访问到About组件的，有点类似于正则表达式的写法:
```
<Route path='/about(/:name)' component={About} />
```
另有一个小Trick，有时候我们在组件内部展示元素的时候是需要根据是否有参数传入然后再判断是否需要显示:
```
{ props.params.name && <h2>Hello, {props.params.name}</h2>}
```

#### Query String Parameters:查询参数
上文介绍的是按照路由参数的方式进行参数传递，就像HTTP URL标准一样，有时候我们也需要按照查询参数的方式来进行参数传递，譬如我们定义了如下基于查询参数的组件:
```
const Query = (props) => (
  <h2>{props.location.query.message}</h2>
)
```
然后我们需要在刚才构建好的路由地址中添加上该组件:
```
...
<Route path='/address' component={Address}>
  <IndexRoute component={TwitterFeed} />
  <Route path='instagram' component={Instagram} />
  <Route path='query' component={Query} />
</Route>
...
```
而对应的带参数传递的跳转到该组件的Link为:
```
<IndexLink 
  activeClassName='active' 
  to={{ 
    pathname: '/address/query', 
    query: { message: 'Hello from Route Query' } 
  }}>Route Query</IndexLink>
```


最后，我们在官方的总的例子中来看下两种参数的使用：
```
import React from 'react'    
import { render } from 'react-dom'    
import { browserHistory, Router, Route, Link } from 'react-router'    
import withExampleBasename from '../withExampleBasename'    
const User = ({ params: { userID }, location: { query } }) => {    
  let age = query && query.showAge ? '33' : ''    
  return (    
    <div className="User">    
      <h1>User id: {userID}</h1>    
      {age}    
    </div>    
  )    
}    
const App = ({ children }) => (    
  <div>    
    <ul>    
      <li><Link to="/user/bob" activeClassName="active">Bob</Link></li>    
      <li><Link to={{ pathname: '/user/bob', query: { showAge: true } }} activeClassName="active">Bob With Query Params</Link></li>    
      <li><Link to="/user/sally" activeClassName="active">Sally</Link></li>    
    </ul>    
    {children}    
  </div>    
)    
render((    
  <Router history={withExampleBasename(browserHistory, __dirname)}>    
    <Route path="/" component={App}>    
      <Route path="user/:userID" component={User} />    
    </Route>    
  </Router>    
), document.getElementById('example'))    
```

# History
- [Histories官方文档](https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md)

React Router 是建立在 [history](https://github.com/rackt/history) 之上的。 简而言之，一个 history 知道如何去监听浏览器地址栏的变化， 并解析这个 URL 转化为 `location` 对象， 然后 router 使用它匹配到路由，最后正确地渲染对应的组件。常用的 history 有三种形式， 但是你也可以使用 React Router 实现自定义的 history。

- [`hashHistory`](http://react-guide.github.io/react-router-cn/docs/guides/basics/Histories.html#createhashhistory)
- [`browserHistory`](http://react-guide.github.io/react-router-cn/docs/guides/basics/Histories.html#createbrowserhistory)
- [`createMemoryHistory`](http://react-guide.github.io/react-router-cn/docs/guides/basics/Histories.html#creatememoryhistory)

从 React Router 库中获取它们：

```
// JavaScript module import
import { browserHistory } from 'react-router'

```
然后可以传入到`<Router>`的配置中：
```
render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('app')
)
```

## `createHashHistory`:用于客户端跳转

这是一个你会获取到的默认 history ，如果你不指定某个 history （即 `{/* your routes */}`）。它用到的是 URL 中的 hash（`#`）部分去创建形如 `example.com/#/some/path` 的路由。

#### 我应该使用 `createHashHistory`吗？

Hash history 是默认的，因为它可以在服务器中不作任何配置就可以运行，并且它在全部常用的浏览器包括 IE8+ 都可以用。但是我们不推荐在实际生产中用到它，因为每一个 web 应用都应该有目的地去使用`createBrowserHistory`。

#### 像这样 `?_k=ckuvup` 没用的在 URL 中是什么？
当一个 history 通过应用程序的 `pushState` 或 `replaceState` 跳转时，它可以在新的 location 中存储 “location state” 而不显示在 URL 中，这就像是在一个 HTML 中 post 的表单数据。在 DOM API 中，这些 hash history 通过 `window.location.hash = newHash` 很简单地被用于跳转，且不用存储它们的location state。但我们想全部的 history 都能够使用location state，因此我们要为每一个 location 创建一个唯一的 key，并把它们的状态存储在 session storage 中。当访客点击“后退”和“前进”时，我们就会有一个机制去恢复这些 location state。你也可以不使用这个特性 (更多内容点击[这里](http://rackt.org/history/stable/HashHistoryCaveats.html)):

```
// 选择退出连续的 state， 不推荐使用
let history = createHistory({
  queryKey: false
});

```

### `createBrowserHistory`:用于服务端跳转

Browser history 是由 React Router 创建浏览器应用推荐的 history。它使用 [History](https://developer.mozilla.org/en-US/docs/Web/API/History) API 在浏览器中被创建用于处理 URL，新建一个像这样真实的 URL `example.com/some/path`。

#### 服务器配置

首先服务器应该能够处理 URL 请求。处理应用启动最初的 `/` 这样的请求应该没问题，但当用户来回跳转并在 `/accounts/123` 刷新时，服务器就会收到来自 `/accounts/123` 的请求，这时你需要处理这个 URL 并在响应中包含 JavaScript 程序代码。

一个 express 的应用可能看起来像这样的：

```
const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const app = express()

// 通常用于加载静态资源
app.use(express.static(__dirname + '/public'))

// 在你应用 JavaScript 文件中包含了一个 script 标签
// 的 index.html 中处理任何一个 route
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port)
console.log("server started on port " + port)

```
如果你的服务器是 nginx，请使用 [`try_files` directive](http://nginx.org/en/docs/http/ngx_http_core_module.html#try_files)：
```
server {
  ...
  location / {
    try_files $uri /index.html
  }
}

```

当在服务器上找不到其他文件时，这就会让 nginx 服务器生成静态文件和操作 `index.html` 文件。

#### IE8, IE9 支持情况

如果我们能使用浏览器自带的 `window.history` API，那么我们的特性就可以被浏览器所检测到。如果不能，那么任何调用跳转的应用就会导致 **全页面刷新**，它允许在构建应用和更新浏览器时会有一个更好的用户体验，但仍然支持的是旧版的。

你可能会想为什么我们不后退到 hash history，问题是这些 URL 是不确定的。如果一个访客在 hash history 和 browser history 上共享一个 URL，然后他们也共享同一个后退功能，最后我们会以产生笛卡尔积数量级的、无限多的 URL 而崩溃。

### `createMemoryHistory`:非地址栏呈现
Memory history 不会在地址栏被操作或读取。这就解释了我们是如何实现服务器渲染的。同时它也非常适合测试和其他的渲染环境（像 React Native ）。
## 实现示例

```
import React from 'react'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, IndexRoute } from 'react-router'
import App from '../components/App'
import Home from '../components/Home'
import About from '../components/About'
import Features from '../components/Features'

React.render(
  <Router history={createBrowserHistory()}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='about' component={About} />
      <Route path='features' component={Features} />
    </Route>
  </Router>,
  document.getElementById('app')
)
```
# Router Control:路由控制
## Manual Navigation:手动导航
在2.4.0版本之前，`router`对象通过`this.context`进行传递，不过这种方式往往会引起莫名的错误。因此在2.4.0版本之后推荐的是采取所谓的HOC模式进行router对象的访问，React Router也提供了一个`withRouter`函数来方便进行封装：
```
import React from 'react'
import { withRouter } from 'react-router'

const Page = React.createClass({
  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, () => {
      if (this.state.unsaved)
        return 'You have unsaved information, are you sure you want to leave this page?'
    })
  },

  render() {
    return <div>Stuff</div>
  }
})

export default withRouter(Page)
```
然后在某个具体的组件内部，可以使用`this.props.router`来获取`router`对象:
```
router.push('/users/12')

// or with a location descriptor object
router.push({
  pathname: '/users/12',
  query: { modal: true },
  state: { fromDashboard: true }
})
```
router对象的常见方法有:
- replace(pathOrLoc):Identical to push except replaces the current history entry with a new one.
- go(n):Go forward or backward in the history by n or -n.
- goBack():Go back one entry in the history.
- goForward():Go forward one entry in the history.

## Confirming Navigation:跳转前确认
React Router提供了钩子函数以方便我们在正式执行跳转前进行确认:
```
const Home = withRouter(
  React.createClass({

    componentDidMount() {
      this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave)
    },

    routerWillLeave(nextLocation) {
      // return false to prevent a transition w/o prompting the user,
      // or return a string to allow the user to decide:
      if (!this.state.isSaved)
        return 'Your work is not saved! Are you sure you want to leave?'
    },

    // ...

  })
)
```

### Enter and Leave Hooks
除了跳转确认之外，[Route](/docs/Glossary.md#route)也提供了钩子函数以通知我们当路由发生时的情况，可以有助于我们进行譬如页面权限认证等等操作:
  - `onLeave` : 当我们离开某个路由时
  - `onEnter` : 当我们进入某个路由时

## Navigating Outside Of Components:组件外路由
如果我们在React Component组件外，譬如Reducer或者Service中需要进行路由跳转的时候，我们可以直接使用`history`对象进行手动跳转:
```
// your main file that renders a Router
import { Router, browserHistory } from 'react-router'
import routes from './app/routes'
render(<Router history={browserHistory} routes={routes}/>, el)
// somewhere like a redux/flux action file:
import { browserHistory } from 'react-router'
browserHistory.push('/some/path')
```

# Async:异步路由加载
> [implicit-code-splitting-with-react-router-and-webpack](http://henleyedition.com/implicit-code-splitting-with-react-router-and-webpack/)

## Dynamic Routing Configuration:动态的路由配置
在介绍对于组件的异步加载之前，React Router也是支持对于路由配置文件的异步加载的。可以参考[huge apps](https://github.com/reactjs/react-router/tree/master/examples/huge-apps)以获得更详细的信息。
```
const CourseRoute = {
  path: 'course/:courseId',

  getChildRoutes(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, [
        require('./routes/Announcements'),
        require('./routes/Assignments'),
        require('./routes/Grades'),
      ])
    })
  },

  getIndexRoute(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('./components/Index'),
      })
    })
  },

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('./components/Course'))
    })
  }
}
```
 
## Lazy Bundle Loading:块/组件的懒加载
React Router在其官方的[huge apps](https://github.com/reactjs/react-router/tree/master/examples/huge-apps)介绍了一种基于Webpack的异步加载方案，不过其实完全直接使用了Webpack的`require.ensure`函数，这样导致了大量的冗余代码，并且导致了路由的逻辑被分散到了多个子文件夹中，其样例项目中的文件结构为:
```
├── components
├── routes
│   ├── Calendar
│   │   ├── components
│   │   │   └── Calendar.js
│   │   └── index.js
│   ├── Course
│   │   ├── components
│   │   │   ├── Course.js
│   │   │   ├── Dashboard.js
│   │   │   └── Nav.js
│   │   └── routes
│   │       ├── Announcements
│   │       │   ├── components
│   │       │   │   ├── Announcements.js
│   │       │   │   ├── Sidebar.js
│   │       │   ├── routes
│   │       │   │   └── Announcement
│   │       │   │       ├── components
│   │       │   │       │   └── Announcement
│   │       │   │       └── index.js
│   │       │   └── index.js
│   │       ├── Assignments
│   │       │   ├── components
│   │       │   │   ├── Assignments.js
│   │       │   │   ├── Sidebar.js
│   │       │   ├── routes
│   │       │   │   └── Assignment
│   │       │   │       ├── components
│   │       │   │       │   └── Assignment
│   │       │   │       └── index.js
│   │       │   └── index.js
│   │       └── Grades
│   │           ├── components
│   │           │   └── Grades.js
│   │           └── index.js
│   ├── Grades
│   │   ├── components
│   │   │   └── Grades.js
│   │   └── index.js
│   ├── Messages
│   │   ├── components
│   │   │   └── Messages.js
│   │   └── index.js
│   └── Profile
│       ├── components
│       │   └── Profile.js
│       └── index.js
├── stubs
└── app.js
```
这种结构下需要为每个组件写一个单独的index.js加载文件，毫无疑问会加大项目的冗余度。笔者建议是使用`bundle-loader`来替代`require.ensure`，这样可以大大简化目前的代码。`bundle-loader`是对于`require.ensuire`的抽象，并且能够大大屏蔽底层的实现。如果某个模块选择使用Bundle Loader进行打包，那么其会被打包到一个单独的Chunk中，并且Webpack会自动地为我们生成一个加载函数，从而使得在需要时以异步请求方式进行加载。我们可以选择删除所有子目录下的`index.js`文件，并且将文件结构进行扁平化处理:
```
├── components
├── routes
│   ├── Calendar.js
│   ├── Course
│   │   ├── components
│   │   │   ├── Dashboard.js
│   │   │   └── Nav.js
│   │   ├── routes
│   │   │   ├── Announcements
│   │   │   │   ├── routes
│   │   │   │   │   └── Announcement.js
│   │   │   │   ├── Announcements.js
│   │   │   │   └── Sidebar.js
│   │   │   ├── Assignments
│   │   │   │   ├── routes
│   │   │   │   │   └── Assignment.js
│   │   │   │   ├── Assignments.js
│   │   │   │   └── Sidebar.js
│   │   │   └── Grades.js
│   │   └── Course.js
│   ├── Grades.js
│   ├── Messages.js
│   └── Profile.js
├── stubs
└── app.js
```
然后我们需要在我们的Webpack中配置如下专门的加载器:
```
// NOTE: this assumes you're on a Unix system. You will
// need to update this regex and possibly some other config
// to get this working on Windows (but it can still work!)
var routeComponentRegex = /routes\/([^\/]+\/?[^\/]+).js$/  


module.exports = {  
  // ...rest of config...
  modules: {
    loaders: [
      // make sure to exclude route components here
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: routeComponentRegex,
        loader: 'babel'
      },
      // run route components through bundle-loader
      {
        test: routeComponentRegex,
        include: path.resolve(__dirname, 'src'),
        loaders: ['bundle?lazy', 'babel']
      }
    ]
  }
  // ...rest of config...
}

```
上述配置中是会将`routes`目录下的所有文件都进行异步打包加载，即将其从主Chunk中移除，而如果你需要指定某个单独的部分进行单独的打包，建议是如下配置:
```
{
...module: {  loaders: [{
    // use `test` to split a single file
    // or `include` to split a whole folder    test: /.*/,
    include: [path.resolve(__dirname, 'pages/admin')],
    loader: 'bundle?lazy&name=admin'
   }]
  
}
...
}
```
而后在`app.js`中，我们只需要用正常的ES6的语法引入组件:
```
// Webpack is configured to create ajax wrappers around each of these modules.
// Webpack will create a separate chunk for each of these imports (including
// any dependencies)
import Course from './routes/Course/Course'  
import AnnouncementsSidebar from './routes/Course/routes/Announcements/Sidebar'  
import Announcements from './routes/Course/routes/Announcements/Announcements'  
import Announcement from './routes/Course/routes/Announcements/routes/Announcement'  
import AssignmentsSidebar from './routes/Course/routes/Assignments/Sidebar'  
import Assignments from './routes/Course/routes/Assignments/Assignments'  
import Assignment from './routes/Course/routes/Assignments/routes/Assignment'  
import CourseGrades from './routes/Course/routes/Grades'  
import Calendar from './routes/Calendar'  
import Grades from './routes/Grades'  
import Messages from './routes/Messages'  

```

需要注意的是，这里引入的对象并不是组件本身，而是Webpack为我们提供的一些封装函数，当你真实地需要调用这些组件时，这些组件才会被异步加载进来。而我们在React Router中需要调用`route.getComponent`函数来异步加载这些组件，我们需要自定义封装一个加载函数:

```

function lazyLoadComponents(lazyModules) {  
  return (location, cb) => {
    const moduleKeys = Object.keys(lazyModules);
    const promises = moduleKeys.map(key =>
      new Promise(resolve => lazyModules[key](resolve))
    )

    Promise.all(promises).then(modules => {
      cb(null, modules.reduce((obj, module, i) => {
        obj[moduleKeys[i]] = module;
        return obj;
      }, {}))
    })
  }
}
```

而最后的路由配置方案如下所示:

```

render(  
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <Route path="calendar" getComponent={ lazyLoadComponent(Calendar) } />
      <Route path="course/:courseId" getComponent={ lazyLoadComponent(Course) }>
        <Route path="announcements" getComponents={ lazyLoadComponents({
          sidebar: AnnouncementsSidebar,
          main: Announcements
        }) }>
          <Route path=":announcementId" getComponent={ lazyLoadComponent(Announcement) } />
        </Route>
        <Route path="assignments" getComponents={ lazyLoadComponents({
          sidebar: AssignmentsSidebar,
          main: Assignments
        }) }>
          <Route path=":assignmentId" getComponent={ lazyLoadComponent(Assignment) } />
        </Route>
        <Route path="grades" getComponent={ lazyLoadComponent(CourseGrades) } />
      </Route>
      <Route path="grades" getComponent={ lazyLoadComponent(Grades) } />
      <Route path="messages" getComponent={ lazyLoadComponent(Messages) } />
      <Route path="profile" getComponent={ lazyLoadComponent(Calendar) } />
    </Route>
  </Router>,
  document.getElementById('example')
)
```

如果你需要支持服务端渲染，那么需要进行下判断:

```

function loadComponent(module) {  
  return __CLIENT__
    ? lazyLoadComponent(module)
    : (location, cb) => cb(null, module);
}
```