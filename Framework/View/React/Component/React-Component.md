
# Component Declaration

React提供了和以往不一样的方式来看待视图，它以组件开发为基础。组件是React的核心概念，React 允许将代码封装成组件（component），然后像插入普通 HTML 标签一样，在网页中插入这个组件。譬如早期的React.createClass 方法或者继承自React.Component的ES6 Class就用于生成一个组件类。对React应用而言，你需要分割你的页面，使其成为一个个的组件。也就是说，你的应用是由这些组件组合而成的。你可以通过分割组件的方式去开发复杂的页面或某个功能区块，并且组件是可以被复用的。这个过程大概类似于用乐高积木去瓶装不同的物体。我们称这种编程方式称为**组件驱动开发**。目前组件中关于布局与数据绑定主要是基于JSX语法进行编写，很类似于HTML标签的布局过程，笔者推荐是全部使用ES6的语法进行组件的声明，其基本样式如下所示:

```

import React from 'react';

/**
 * Rendering <HelloMessage text='Hello Sarah' /> results in this HTML:
 * <div>Hello Sarah</div>
 */

class HelloMessage extends Component {
  render() {
    return <div>{ this.props.text }</div>
  }
}
```

React的核心魅力即在于其灵活的组件，其组件与其他传统的譬如Angular 1这样的框架相比，具有以下特点:

- Compositional Components

组件的可随意组合性是其灵魂特性，笔者也有专门的章节来介绍组件的组合策略与最佳实践。通过组件的组合，你可以以较好地方式进行代码复用与分发。

- Pure Components

React中提倡的函数式组件不会有任何的副作用，并且下文中提及的Dumb Component与Smart Component的分隔与HOC模式保证了组件的可测试性。

- Basic LifeCycle

React为其组件提供了一个基本的生命周期，这保证了我们对于组件更好地控制性，并且变相地也为我们提供了命名空间等分隔。


## LifeCycle

> - [react-components-lifecycle](https://medium.com/react-ecosystem/react-components-lifecycle-ce09239010df#.tfkr6cgzu)



组件的生命周期分成三个状态：

- Mounting：已插入真实 DOM，即Initial Render
  
- Updating：正在被重新渲染，即Props与State改变
  
- Unmounting：已移出真实 DOM，即Component Unmount
  
  React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数。
  
- componentWillMount()
  
- componentDidMount()
  
- componentWillUpdate(object nextProps, object nextState)
  
- componentDidUpdate(object prevProps, object prevState)
  
- componentWillUnmount()

此外，React 还提供两种特殊状态的处理函数。

- componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
- shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用

### Ini­tial Render

![](https://camo.githubusercontent.com/461765618c95d7d3d0941d767a95855cb5698195/687474703a2f2f7279616e73756b616c652e636f6d2f76697a2f74682f6a732f72656163746a735f636f6d706f6e656e745f6c6966656379636c652f696e697469616c5f72656e6465722e706e67)

### Props Change

![](https://camo.githubusercontent.com/89a1b3c9ec4282045c095b5e74c296de7165955a/687474703a2f2f7279616e73756b616c652e636f6d2f76697a2f74682f6a732f72656163746a735f636f6d706f6e656e745f6c6966656379636c652f70726f70735f6368616e67652e706e67)

### State Change

![](https://camo.githubusercontent.com/10de2955e68ca334679daf4cf821b18b5364f029/687474703a2f2f7279616e73756b616c652e636f6d2f76697a2f74682f6a732f72656163746a735f636f6d706f6e656e745f6c6966656379636c652f73746174655f6368616e67652e706e67)

这里可以看出，Props比State的改变会有多出一个`componentWillReceiveProps`的回调方法。在React中有一种被称为[PureRenderMixin](https://facebook.github.io/react/docs/pure-render-mixin.html)的Mixin模式，它可以用来对新的属性和之前的属性进行对比，如果是数据没有发生变化，就不再重新渲染。在内部实现上，它也是基于shouldComponentUpdate 方法的。

这听起来很赞，但遗憾的是，PureRenderMixin并不能很好的进行对象的比较。它只会检查对象引用的相等性（===），也就是说， 对于有相同数据的不同对象而言它会返回false。

``` 
`boolean shouldComponentUpdate(object nextProps, object nextState)`
```

如果shouldComponentUpdate返回的是false的话，render函数便会跳过，直到状态再次发生改变。（此外，componentWillUpdate 和componentDidUpdate也会被跳过）。对于上面所说的问题，我们可以简单的举个例子来说明，有代码如下：

``` javascript
`var` `a = { foo: ``'bar'` `};  ``var` `b = { foo: ``'bar'` `};``a === b; ``// false`
```

可以看到，数据是相同的，但它们隶属于不同对象的引用，因此返回的是false，也因此组件仍然会进行重新渲染，显然这没有达到我们的目的。 如果我们想要达成设想的效果（即对于相同数据而言，组件不再重新渲染），我们就需要在原始的对象上进行数据的修改：

``` javascript
`var` `a = { foo: ``'bar'` `};  ``var` `b = a;  ``b.foo = ``'baz'``;  ``a === b; ``// true`
```

虽然实现一个能够进行深度对象比较的mixin来代替引用检查并不困难，但是，考虑到React调用shouldComponentUpdate方法非常频繁，并且对象的 深度检查代价较高，所以React选择了这种对象引用比较的方案。



### Com­po­nent Unmount

![](https://camo.githubusercontent.com/c0390065e7dcd4e75ad6a146db705f8a23826716/687474703a2f2f7279616e73756b616c652e636f6d2f76697a2f74682f6a732f72656163746a735f636f6d706f6e656e745f6c6966656379636c652f756e6d6f756e742e706e67)

如果需要判断某个组件是否挂载，可以isMounted()方法进行判断，可以用该方法来确保异步调用中的setState与forceUpdate方法不会被误用。不过该方法在ES6的类中已经被移除了，在未来的版本中也会被逐步移除。	

总结而言，一个完整的React Component的写法应该如下：

``` javascript
/**
 * @jsx React.DOM
 */

var React = require('react'),
    MyReactComponent = React.createClass({

    // The object returned by this method sets the initial value of this.state
    getInitialState: function(){
        return {};
    },

    // The object returned by this method sets the initial value of this.props
    // If a complex object is returned, it is shared among all component instances      
    getDefaultProps: function(){
        return {};
    },

    // Returns the jsx markup for a component
    // Inspects this.state and this.props create the markup
    // Should never update this.state or this.props
    render: function(){
        return (<div></div>);
    },

    // An array of objects each of which can augment the lifecycle methods
    mixins: [],

    // Functions that can be invoked on the component without creating instances
    statics: {
        aStaticFunction: function(){}
    },

    // -- Lifecycle Methods --

    // Invoked once before first render
    componentWillMount: function(){
        // Calling setState here does not cause a re-render
    },

    // Invoked once after the first render
    componentDidMount: function(){
        // You now have access to this.getDOMNode()
    },

    // Invoked whenever there is a prop change
    // Called BEFORE render
    componentWillReceiveProps: function(nextProps){
        // Not called for the initial render
        // Previous props can be accessed by this.props
        // Calling setState here does not trigger an an additional re-render
    },

    // Determines if the render method should run in the subsequent step
    // Called BEFORE a render
    // Not called for the initial render
    shouldComponentUpdate: function(nextProps, nextState){
        // If you want the render method to execute in the next step
        // return true, else return false
        return true;
    },

    // Called IMMEDIATELY BEFORE a render
    componentWillUpdate: function(nextProps, nextState){
        // You cannot use this.setState() in this method
    },

    // Called IMMEDIATELY AFTER a render
    componentDidUpdate: function(prevProps, prevState){
    },

    // Called IMMEDIATELY before a component is unmounted
    componentWillUnmount: function(){
    }

}); 

module.exports = MyReactComponent;
```

## DOM Integration

`React.findDOMNode()`方法能够帮我们根据`refs`获取某个子组件的DOM对象，不过需要注意的是组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM （virtual DOM）。只有当它插入文档以后，才会变成真实的 DOM 。根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 DOM diff ，它可以极大提高网页的性能表现。但是，有时需要从组件获取真实 DOM 的节点，这时就要用到 React.findDOMNode 方法。

``` 
var MyComponent = React.createClass({
  handleClick: function() {
    React.findDOMNode(this.refs.myTextInput).focus();
  },
  render: function() {
    return (
      <div>
        <input type="text" ref="myTextInput" />
        <input type="button" value="Focus the text input" onClick={this.handleClick} />
      </div>
    );
  }
});

React.render(
  <MyComponent />,
  document.getElementById('example')
);

```

需要注意的是，由于 React.findDOMNode 方法获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个方法，否则会返回 null 。上面代码中，通过为组件指定 Click 事件的回调函数，确保了只有等到真实 DOM 发生 Click 事件之后，才会调用 React.findDOMNode 方法。

### jQuery



## Props VS State

组件的主要职责是将原始数据转化为HTML中的富文本格式，而Props与State协作完成这件事，换言之，Props与State的并集即是全部的原始数据。Props与State之间也是有很多交集的，譬如：

- Props与State都是JS对象。
- Props与State的值的改变都会触发界面的重新渲染。
- Props与State都是确定性的，即在确定的Props或者State的值的情况下都会得出相同的界面。

不过Props顾名思义，更多的是作为Component的配置项存在。Props往往是由父元素指定并且传递给自己的子元素，不过自身往往不会去改变Props的值。另一方面，State在组件被挂载时才会被赋予一个默认值，而常常在与用户的交互中发生更改。往往一个组件独立地维护它的整个状态机，可以认为State是一个私有属性。他们的对比如下：

| 描述             | Props | State |
| -------------- | ----- | ----- |
| 是否可以从父元素获取初始值  | Yes   | Yes   |
| 是否可以被父元素改变     | Yes   | No    |
| 是否可以设置默认值      | Yes   | Yes   |
| 是否可以在组件内改变     | No    | Yes   |
| 是否可以设置为子元素的初始值 | Yes   | Yes   |
| 是否可以在子元素中改变    | Yes   | No    |



# Props 

## Default Props

## Props Validation

``` javascript
React.createClass({
  propTypes: {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    optionalArray: React.PropTypes.array,
    optionalBool: React.PropTypes.bool,
    optionalFunc: React.PropTypes.func,
    optionalNumber: React.PropTypes.number,
    optionalObject: React.PropTypes.object,
    optionalString: React.PropTypes.string,

    // Anything that can be rendered: numbers, strings, elements or an array
    // containing these types.
    optionalNode: React.PropTypes.node,

    // A React element.
    optionalElement: React.PropTypes.element,

    // You can also declare that a prop is an instance of a class. This uses
    // JS's instanceof operator.
    optionalMessage: React.PropTypes.instanceOf(Message),

    // You can ensure that your prop is limited to specific values by treating
    // it as an enum.
    optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),

    // An object that could be one of many types
    optionalUnion: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.instanceOf(Message)
    ]),

    // An array of a certain type
    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

    // An object with property values of a certain type
    optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),

    // An object taking on a particular shape
    optionalObjectWithShape: React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number
    }),

    // You can chain any of the above with `isRequired` to make sure a warning
    // is shown if the prop isn't provided.
    requiredFunc: React.PropTypes.func.isRequired,

    // A value of any data type
    requiredAny: React.PropTypes.any.isRequired,

    // You can also specify a custom validator. It should return an Error
    // object if the validation fails. Don't `console.warn` or throw, as this
    // won't work inside `oneOfType`.
    customProp: function(props, propName, componentName) {
      if (!/matchme/.test(props[propName])) {
        return new Error('Validation failed!');
      }
    }
  },
  /* ... */
});
```

## Children Prop

this.props 对象的属性与组件的属性一一对应，但是有一个例外，就是 this.props.children 属性。它表示组件的所有子节点。

``` javascript
    var NotesList = React.createClass({
      render: function() {
        return (
          <ol>
          {
            this.props.children.map(function (child) {
              return <li>{child}</li>
            })
          }
          </ol>
        );
      }
    });

    React.render(
      <NotesList>
        <span>hello</span>
        <span>world</span>
      </NotesList>,
      document.body
    );
```

# State

> - [how-to-handle-state-in-react](https://medium.com/react-ecosystem/how-to-handle-state-in-react-6f2d3cd73a0c#.i7hd01k4c)



## Initial State:初始状态

设置State的初始状态。
``` 
var MyComponent = React.createClass({
    getInitialState: function(){
        return {
            count: 5
        }
    },
    render: function(){
        return (
            <h1>{this.state.count}</h1>
        )
    }
});

```



## State Update:更新State

### Immutable VS Mutable:不可变数据还是可变数据?

在像JavaScript这样的命令式编程语言中石油可变的数据结构是个很正常的事情，更广泛的说，在任何一个面向对象的语言中都会允许修改对象的状态来进行操作与记录。而众所周知的，对于对象进行的变化操作并不会影响引用相等的结果，而只会在进行值判断时影响结果。在上文组件的基本声明中我们看到，React提供了一个`render`函数来负责进行实际的界面渲染工作，那么React在检测到State发生变化时才会进行重渲染。而实际上，React并不希望知道你太多的关于State的细节来判断你的State是否发生了变化。从性能的角度，越快的判断操作越能帮助React决定是否需要进行界面的重渲染。总结而言，选择Immutable State的优势在于:

- 能够提供组件的性能表现，在调优章节中我们会介绍如何利用`shouldComponentUpdate`来进行性能调优，而选用Immutable State能够有助于快速地基于引用的判断

- 可以让数据的改变变得更加清晰，当我们使用Immutable方法来获得某个对象的修改后的副本时，我们会得到如下的流程:

```

var object = { x: 2, y: 4 }; var changedObject = performSomething(object); object.x; // 2 object.y; // 4 changedObject.x; // ? changedObject.y; // ?

```

- 保证了组件状态的可回溯性，当我们使用Redux作为应用的状态管理容器时，基于其提供的Single Store机制以及不可变的State Tree，我们能够方便地查看到State的变换记录，从而对整个应用在时间轴上的操作进行回溯。



#### React Immutability Helpers

React官方库在其Addons中提供了一个便携式的Immutable辅助库，算是ImmutableJS的简化版，笔者自己比较喜欢用这种方式进行状态的更新，相较于`Object.assign`会优雅很多，而相较于ImmutableJS又不需要引入额外的依赖库。基本用法如下所示：

```



var update = require('react-addons-update');

var newData = update(myData, {

  x: {y: {z: {$set: 7}}},

  a: {b: {$push: [9]}}

});

```

其中以`$`为前缀的键被称为命令，而可变的数据称为目标，常用的几个命令为：



- `{$push: array}`:  将 `array`中的元素添加到目标尾。

- `{$unshift: array}`:从目标数组中移除所有在`array`中的元素。

- `{$splice: array of arrays}` for each item in `arrays` call `splice()` on the target with the parameters provided by the item.

- `{$set: any}` : 替换整个目标

- `{$merge: object}`:根据键值将目标与`object`合并

- `{$apply: function}` :输入当前值，并且根据新的值进行更新



- 简单的插入

```

var initialArray = [1, 2, 3];

var newArray = update(initialArray, {$push: [4]}); // => [1, 2, 3, 4]

```

注意，`initialArray`仍然是`[1,2,3]`。

- 嵌套集合

```

var collection = [1, 2, {a: [12, 17, 15]}];

var newCollection = update(collection, {2: {a: {$splice: [[1, 1, 13, 14]]}}});

// => [1, 2, {a: [12, 13, 14, 15]}]

```

根据下标`2`访问集合，然后根据键`a`访问数组，然后从下标1开始拼接新数组，并且插入新的13，14。

- 根据现有的值更新数据

```

var obj = {a: 5, b: 3};

var newObj = update(obj, {b: {$apply: function(x) {return x * 2;}}});

// => {a: 5, b: 6}

// This is equivalent, but gets verbose for deeply nested collections:

var newObj2 = update(obj, {b: {$set: obj.b * 2}});

```

- 合并

```

var obj = {a: 5, b: 3};

var newObj = update(obj, {$merge: {b: 6, c: 7}}); // => {a: 5, b: 6, c: 7}

```

# FunctionalComponent

> - [stateless-components-in-react](https://medium.com/@joshblack/stateless-components-in-react-0-14-f9798f8b992d#.fkbrv6x6s)



前文介绍的组件的定义方式主要是声明式组件，其与传统的jQuery中以DOM操作为核心的命令式组件生成相比具有更大的灵活性与可组合性。而实际上随着应用复杂度与所需要的组件数目的持续增加，我们所需要的组件也会被划分为很多的类型。从组件组合的角度或者所谓动态组件的角度来看，常见的即是HOC模式，即将某个组件作为另一个组件的Props或者子组件从而封装出高阶组件。还有另一种偏向函数式的模式即是构造出函数式组件，就好像Arrow Function一样，对于无状态的简单组件，使用函数式组件的方式声明，会使得代码的可读性更好，并且减少冗余代码的数目。在React本身对于界面的抽象可以用`View = f(props)`，即纯粹的界面的渲染函数可以近似看做纯函数。函数式组件与基于Class声明的组件相比，其具有以下特性:

- 不需要声明类，可以避免大量的譬如extends或者constructor这样的代码

- 不需要显示声明this关键字，在ES6的类声明中往往需要将函数的this关键字绑定到当前作用域，而因为函数式声明的特性，我们不需要再强制绑定:

```

onClick={this.sayHi.bind(this)}>Say Hi</a>
onClick={sayHi}>Say Hi</a>

```

- 贯彻最佳实践，在[React组件复用与组合](https://github.com/wxyyxc1992/web-frontend-practice-handbook/blob/master/framework/view/react/component/react-compositedcomponents.md)中我们会提到，应当避免在底层的展示性组件中混入对于状态的管理，而应该将状态托管于某个高阶组件或者其他的状态容器中。利用函数式声明组件可以彻底保证不会在组件中进行状态操作。

- 易于理解与测试

- 更佳的性能表现:因为函数式组件中并不需要进行生命周期的管理与状态管理，因此React并不需要进行某些特定的检查或者内存分配，从而保证了更好地性能表现。



最后，通过下图的对比，可以看出函数式组件声明方法的简洁性：

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/7/4/1-zyaxLgvQHfgaDjMoP90XAw.png)



## Usage:使用

这里我们定义一个简单的Text组件:

```

class Text extends React.Component {

  render() {

    return <p>{this.props.children}</p>;

  }

}

React.render(<Text>Hello World</Text>, document.body);

```

上面定义的Text组件可以看做典型的Pure Components，或者说是Dummy Components，即好像函数式编程中的纯函数一样，输出完全由输入的Props决定，并且不会产生任何的副作用。这种类型的组件会在我们的应用中占据很大的份额，而在React 0.14之后也允许我们以类似于定义函数的方式来定义这种无状态组件，如下所示：

```

const Text = (props) =>
  <p>{props.children}</p>;
// ReactDOM is part of the introduction of React 0.14
ReactDOM.render(
  <Text>Hello World</Text>, 
  document.querySelector('#root')
);
```

这种模式主要是鼓励在大型项目中尽可能地以简单的写法来分割原本庞大的组件，而未来React也会面向这种无状态的组件在譬如避免无意义的检查或者内存分配领域进行一些专门的优化。这种无状态函数式组件的写法也是支持设置默认的Props类型与值的：

```

const Text = ({ children }) => 
  <p>{children}</p>
Text.propTypes = { children: React.PropTypes.string };
Text.defaultProps = { children: 'Hello World!' };
```

我们也可以利用ES6默认函数参数的方式来设置默认值:

```

const Text = ({ children = 'Hello World!' }) =>
  <p>{children}</p>
```

另外，在无状态的组件函数中，我们也是可以访问Context的:

```

const Text = (props, context) =>
  <p style={context}>props.children</p>;
Text.contextTypes = {
  fontFamily: React.PropTypes.string
};
class App extends React.Component {
  static childContextTypes = {
    fontFamily: React.PropTypes.string
  }
  getChildContext() {
    return {
      fontFamily: 'Helvetica Neue'
    };
  }
  render() {
    return <Text>Hello World</Text>;
  }
}
```



![](http://153.3.251.190:11900/react-component)