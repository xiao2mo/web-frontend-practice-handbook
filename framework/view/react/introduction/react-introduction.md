
# Introduction

![ScreenShot](http://image.beekka.com/blog/2015/bg2015033103.png)

React并不是一个完整的MVC或者MVVM框架，它与Angular也是负责不同的方面，它最大的功能是提供一个高效的视图层。React提供了一些新颖的概念、库和编程原则让你能够同时在服务端和客户端编写快速、紧凑、漂亮的代码来构建你的web应用。如果你使用React，那么可能会涉及到一些常用的概念或技术，包括：

- ES6 React

- 虚拟DOM（virtual DOM）
- 组件驱动开发（component-driven development）
- 不变性（immutability）
- 自上而下的渲染（top-down rendering）
- 渲染路径和优化
- 打包工具, ES6, 构建请求, debugging, 路由等
- 同构React（isomorphic React）

``` 
在具体的React实践中，考虑到纯粹的UI或者UX设计人员，他们可能只会将CSS与HTML进行组合，换言之，大量的赋值还是会放置在HTML而非JSX中，建议还是可以运用jQuery+React或者Angular+React的方式。
```

## Virtual Dom

``` 
如我们所知，在浏览器渲染网页的过程中，加载到HTML文档后，会将文档解析并构建DOM树，然后将其与解析CSS生成的CSSOM树一起结合产生爱的结晶——RenderObject树，然后将RenderObject树渲染成页面（当然中间可能会有一些优化，比如RenderLayer树）。这些过程都存在与渲染引擎之中，渲染引擎在浏览器中是于JavaScript引擎（JavaScriptCore也好V8也好）分离开的，但为了方便JS操作DOM结构，渲染引擎会暴露一些接口供JavaScript调用。由于这两块相互分离，通信是需要付出代价的，因此JavaScript调用DOM提供的接口性能不咋地。各种性能优化的最佳实践也都在尽可能的减少DOM操作次数。

而虚拟DOM干了什么？它直接用JavaScript实现了DOM树（大致上）。组件的HTML结构并不会直接生成DOM，而是映射生成虚拟的JavaScript DOM结构，React又通过在这个虚拟DOM上实现了一个 diff 算法找出最小变更，再把这些变更写入实际的DOM中。这个虚拟DOM以JS结构的形式存在，计算性能会比较好，而且由于减少了实际DOM操作次数，性能会有较大提升。
```

![virtual dom](http://wwsun.me/img/posts/150809-react-js-vdom.png)

``` 
React渲染出来的HTML标记都包含了`data-reactid`属性，这有助于React中追踪DOM节点。
```

> - [React’s diff algorithm](http://calendar.perfplanet.com/2013/diff/)
> - [The Secrets of React’s virtual DOM](http://fluentconf.com/fluent2014/public/schedule/detail/32395)
> - [Why is React’s concept of virtual DOM said to be moreperformant than dirty model checking?](http://stackoverflow.com/questions/21109361/why-is-reacts-concept-of-virtual-dom-said-to-be-more-performant-than-dirty-mode)
> - [virtual-dom](https://github.com/Matt-Esch/virtual-dom)

## 单向数据流

在React中，应用利用State与Props对象实现单向数据流的传递。换言之，在一个多组件的架构中，某个父类组件只会负责响应自身的State，并且通过Props在链中传递给自己的子元素。

``` javascript
/** @jsx React.DOM */

var FilteredList = React.createClass({
  filterList: function(event){
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item){
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  },
  getInitialState: function(){
     return {
       initialItems: [
         "Apples",
         "Broccoli",
         "Chicken",
         "Duck",
         "Eggs",
         "Fish",
         "Granola",
         "Hash Browns"
       ],
       items: []
     }
  },
  componentWillMount: function(){
    this.setState({items: this.state.initialItems})
  },
  render: function(){
    return (
      <div className="filter-list">
        <input type="text" placeholder="Search" onChange={this.filterList}/>
      <List items={this.state.items}/>
      </div>
    );
  }
});

var List = React.createClass({
  render: function(){
    return (
      <ul>
      {
        this.props.items.map(function(item) {
          return <li key={item}>{item}</li>
        })
       }
      </ul>
    )  
  }
});

React.render(<FilteredList/>, document.getElementById('mount-point'));
```

[React][2]


## Reference

### Tutorials & Docs

- [Your First Immutable React & Redux App](http://reactjsnews.com/your-first-redux-app/)
- [react-howto](https://github.com/petehunt/react-howto)
- [react-js-tutorial](http://www.tutorials.kode-blog.com/react-js-tutorial)

- [reactspeedcoding:基于几十个项目的React学习](https://github.com/manavsehgal/reactspeedcoding)

- [React设计思想](https://github.com/react-guide/react-basic?utm_source=tuicool&utm_medium=referral)

### Blogs & News
- [Awesome-React](https://github.com/enaqx/awesome-react)
- [阮一峰-React入门实例教程][10]
- [深入浅出React][11]
- [git-books React入门教程](http://hulufei.gitbooks.io/react-tutorial/content/index.html)

- [React中文文档翻译](http://reactjs.cn/react/index.html)


## Practice

- [Learn React by building the Hacker News front page][12]
- [Thinking-in-React](https://facebook.github.io/react/docs/thinking-in-react.html)
- [mybridge-reactjs](http://www.mybridge.co/skills/reactjs)

- [react-redux-links](https://github.com/markerikson/react-redux-links)


### Books & Tools

- [webpack_react:survivejs出品的从了解到掌握Webpack&React](https://github.com/survivejs/webpack_react)
- [Pro React](http://7xkt0f.com1.z0.glb.clouddn.com/Apress.Pro.React.1484212614.pdf)
### Practices

- [React.js 2016最佳实践](http://www.alloyteam.com/2016/01/reactjs-best-practices-for-2016/?utm_source=tuicool&utm_medium=referral)

- [awesome-react](https://github.com/enaqx/awesome-react)





# JSX

HTML 语言直接写在 JavaScript 语言之中，不加任何引号，这就是 JSX 的语法，它允许 HTML 与 JavaScript 的混写。

``` javascript
var names = ['Alice', 'Emily', 'Kate'];

React.render(
  <div>
  {
    names.map(function (name) {
      return <div>Hello, {name}!</div>
    })
  }
  </div>,
  document.getElementById('example')
);
```

上面代码体现了 JSX 的基本语法规则：遇到 HTML 标签（以 < 开头），就用 HTML 规则解析；遇到代码块（以 { 开头），就用 JavaScript 规则解析。JSX 允许直接在模板插入 JavaScript 变量。如果这个变量是一个数组，则会展开这个数组的所有成员:

``` javascript
var arr = [
  <h1>Hello world!</h1>,
  <h2>React is awesome</h2>,
];
React.render(
  <div>{arr}</div>,
  document.getElementById('example')
);
```

## Transfer

JSX编译器的核心是将基于XML的语言编译成JS代码，主要是依赖于React.createElment函数。

``` javascript
var Nav;
// Input (JSX):
var app = <Nav color="blue" />;
// Output (JS):
var app = React.createElement(Nav, {color:"blue"});
```

``` javascript
var Nav, Profile;
// Input (JSX):
var app = <Nav color="blue"><Profile>click</Profile></Nav>;
// Output (JS):
var app = React.createElement(
  Nav,
  {color:"blue"},
  React.createElement(Profile, null, "click")
);
```




## JavaScript Expressions

### 属性表达式

如果需要在HTML中混入JavaScript变量值，需要利用{}来代替""。

``` 
// Input (JSX):
var person = <Person name={window.isLoggedIn ? window.name : ''} />;
// Output (JS):
var person = React.createElement(
  Person,
  {name: window.isLoggedIn ? window.name : ''}
);
```

### Boolean Attributes

``` javascript
// These two are equivalent in JSX for disabling a button
<input type="button" disabled />;
<input type="button" disabled={true} />;

// And these two are equivalent in JSX for not disabling a button
<input type="button" />;
<input type="button" disabled={false} />;
```

### Child Expressions

``` 
// Input (JSX):
var content = <Container>{window.isLoggedIn ? <Nav /> : <Login />}</Container>;
// Output (JS):
var content = React.createElement(
  Container,
  null,
  window.isLoggedIn ? React.createElement(Nav) : React.createElement(Login)
);
```

### Comments：注释

``` 
JSX 里添加注释很容易；它们只是 JS 表达式而已。你只需要在一个标签的子节点内(非最外层)小心地用 `{}` 包围要注释的部分。
```

``` 
var content = (
  <Nav>
    {/* child comment, put {} around */}
    <Person
      /* multi
         line
         comment */
      name={window.isLoggedIn ? window.name : ''} // end of line comment
    />
  </Nav>
);

```

## Multiple Case

### If-Else

``` 
在JSX中是不可以直接在{}中加入if-else的，可以使用下面这种三元表达式：
```

``` javascript
React.render(<div id={condition ? 'msg' : ''}>Hello World!</div>, mountNode);
```

``` 
不过三元表达式往往并不能满足需求，React建议的方式是在JS代码中使用if表达式：
```

``` javascript
var loginButton;
if (loggedIn) {
  loginButton = <LogoutButton />;
} else {
  loginButton = <LoginButton />;
}

return (
  <nav>
    <Home />
    {loginButton}
  </nav>
);
```

#### Show-Hide

``` javascript
<style type="text/css">
    .hidden { display:none; }
</style>

render: function() {
    return (
      <div className={this.props.shouldHide ? 'hidden' : ''}>
        This will be hidden if you set <tt>props.shouldHide</tt> 
        to something truthy.
      </div>
    );
}
```

### Switch-Case

``` javascript
return (
  <section>
    <h1>Color</h1>
    <h3>Name</h3>
    <p>{this.state.color || "white"}</p>
    <h3>Hex</h3>
    <p>
      {(() => {
        switch (this.state.color) {
          case "red":   return "#FF0000";
          case "green": return "#00FF00";
          case "blue":  return "#0000FF";
          default:      return "#FFFFFF";
        }
      })()}
    </p>
  </section>
);
```

### Loop：循环

``` javascript
var rows = [];
for (var i=0; i < numrows; i++) {
    rows.push(<ObjectRow />);
}
return <tbody>{rows}</tbody>;
```












[1]: http://image.beekka.com/blog/2015/bg2015033103.png
[2]: https://github.com/facebook/react
[3]: http://fakefish.github.io/react-webpack-cookbook/Getting-started.html
[4]: https://github.com/wxyyxc1992/Web-React-Angular
[5]: http://image.beekka.com/blog/2015/bg2015033110.png
[6]: https://github.com/uberVU/react-guide/blob/master/props-vs-state.md
[7]: http://stackoverflow.com/questions/26882177/react-js-inline-style-best-practices
[8]: http://facebook.github.io/react/docs/events.html#supported-events
[10]: http://www.ruanyifeng.com/blog/2015/03/react.html
[11]: http://www.infoq.com/cn/articles/react-art-of-simplity/
[12]: https://github.com/mking/react-hn
