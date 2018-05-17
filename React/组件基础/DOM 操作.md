[![返回目录](https://parg.co/UY3)](https://parg.co/U0I) 







# React 组件中 DOM 操作

`React.findDOMNode()`方法能够帮我们根据`refs`获取某个子组件的DOM对象，不过需要注意的是组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM (virtual DOM)。只有当它插入文档以后，才会变成真实的 DOM 。根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 DOM diff ，它可以极大提高网页的性能表现。但是，有时需要从组件获取真实 DOM 的节点，这时就要用到 React.findDOMNode 方法。

``` 
var MyComponent = React.createClass({
  handleClick: function() {
    React.findDOMNode(this.refs.myTextInput).focus();
  },
  render: function() {
    return (
      <div>
        <input type="text" ref="myTextInput" />
        <input type="button" value="Focus the text input" onClick={this.handleClick} />
      </div>
    );
  }
});

React.render(
  <MyComponent />,
  document.getElementById('example')
);

```

需要注意的是，由于 React.findDOMNode 方法获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个方法，否则会返回 null 。上面代码中，通过为组件指定 Click 事件的回调函数，确保了只有等到真实 DOM 发生 Click 事件之后，才会调用 React.findDOMNode 方法。





# 组件渲染到 DOM


React 的初衷是构建相对独立的界面开发库，


在源代码中，组件定义相关代码与渲染相关代码是相分离的。当我们声明了某个组件之后，可以通过`ReactDOM`的`render`函数将React组件渲染到DOM元素中：
```
const RootElement = (
  <div>
    <h1 style=>The world is yours</h1>
    <p>Say hello to my little friend</p>
  </div>
)


ReactDOM.render(RootElement, document.getElementById('app'))
```


# Refs


# 整合非 React 类库







