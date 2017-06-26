# State


`setState`方法最大的特点在于异步批次更新，其内部实现原理我们会在未来章节详细介绍。

# 组件状态

## 避免状态误用

React 组件中的数据流主要由 Props 与 State 构成，我们已经知道 State 可以用于存放组件内部的临时状态。在传统的面向对象编程中，我们习惯在构造函数中将外部传入的构造参数存入类的成员变量中；不过这种设计模式在 React 组件开发中却容易造成反模式。譬如我们要开发 `NameLabel` 组件，其允许外部传入 `firstName` 与 `lastName` 两个参数，该组件会将两个参数组合展示：
```
class NameLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: props.firstName + "" + props.lastName
    };
  }

  render() {
    return <h1>Hello, {this.state.fullName}</h1>;
  }
}
```
该组件存在的问题在于我们将 Props 传入的参数缓存在了 State 中，当父组件修改 Props 参数时并不会触发构造函数，相对应地最终的界面展示也就不会随着外部传入参数的变化而变化。为了修复这个错误我们可以复写组件的 `componentWillReceiveProps` 函数：
```
class NameLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: props.firstName + "" + props.lastName
    };
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      fullName: nextProps.firstName + "" + nextProps.lastName
    };
  }

  render() {
    return <h1>Hello, {this.state.fullName}</h1>;
  }
}
```
通过复写 `componentWillReceiveProps` 函数我们能够正确响应外部 Props 的变化，不过这种方式还是显得有所冗余，我们没有必要将 Props 中的数据缓存到 State 中。我们可以在 `render` 函数中直接读取 Props 中传入的参数然后显示：
```
class NameLabel extends Component {
  render() {
    const { firstName, lastName } = this.props;
    const fullName = firstName + "" + lastName;
    return <h1>Hello, {fullName}</h1>;
  }
}
```
再精简一点，我们可以直接用函数式组件表示：
```
function NameLabel({ firstName, lastName }) {
  const fullName = firstName + "" + lastName;
  return <h1>Hello, {fullName}</h1>;
}
```


## 外部操作组件状态
React 中我们需要避免直接操作 DOM 节点或者访问全局变量，不过某些情况下我们需要在组件外触发组件内部状态更新，可以通过构建挂载于全局变量下的闭包来达成：
```
componentWillMount(){
 globalVar.callback = (data) => {
    // `this` 指向当前React组件
    this.setState({...});     
  };
}
```
在我们需要触发事件更新，譬如将获取到的数据渲染到界面上时，直接操作全局变量即可：
```
globalVar.callback(data);
```
笔者还是要强调下，这种模式并不提倡，会破坏React的数据流与组件的封装性，务必要谨慎使用。

# setState 同步更新

我们在上文中提及，为了提高性能React将setState设置为批次更新，即是异步操作函数，并不能以顺序控制流的方式设置某些事件，我们也不能依赖于`this.state`来计算未来状态。典型的譬如我们希望在从服务端抓取数据并且渲染到界面之后，再隐藏加载进度条或者外部加载提示：
```
componentDidMount() {
    fetch('https://example.com')
        .then((res) => res.json())
        .then(
            (something) => {
                this.setState({ something });
                StatusBar.setNetworkActivityIndicatorVisible(false);
            }
        );
}
```
因为`setState`函数并不会阻塞等待状态更新完毕，因此`setNetworkActivityIndicatorVisible`有可能先于数据渲染完毕就执行。我们可以选择在`componentWillUpdate`与`componentDidUpdate`这两个生命周期的回调函数中执行`setNetworkActivityIndicatorVisible`，但是会让代码变得破碎，可读性也不好。实际上在项目开发中我们更频繁遇见此类问题的场景是以某个变量控制元素可见性：
```
this.setState({showForm : !this.state.showForm});
```
我们预期的效果是每次事件触发后改变表单的可见性，但是在大型应用程序中如果事件的触发速度快于`setState`的更新速度，那么我们的值计算完全就是错的。本节就是讨论两种方式来保证`setState`的同步更新。

## 完成回调

`setState`函数的第二个参数允许传入回调函数，在状态更新完毕后进行调用，譬如：
```
    this.setState({
      load: !this.state.load,
      count: this.state.count + 1
    }, () => {
      console.log(this.state.count);
      console.log('加载完成')
    });
```
这里的回调函数用法相信大家很熟悉，就是JavaScript异步编程相关知识，我们可以引入Promise来封装setState:
```
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }
```
`setStateAsync `返回的是Promise对象，在调用时我们可以使用Async/Await语法来优化代码风格：
```
  async componentDidMount() {
    StatusBar.setNetworkActivityIndicatorVisible(true)
    const res = await fetch('https://api.ipify.org?format=json')
    const {ip} = await res.json()
    await this.setStateAsync({ipAddress: ip})
    StatusBar.setNetworkActivityIndicatorVisible(false)
  }
```
这里我们就可以保证在`setState`渲染完毕之后调用外部状态栏将网络请求状态修改为已结束，整个组件的完整定义为：
```
class AwesomeProject extends Component {
  state = {}
  setStateAsync(state) {
    ...
  }
  async componentDidMount() {
   ...
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          My IP is {this.state.ipAddress || 'Unknown'}
        </Text>
      </View>
    );
  }
}
```

## 传入状态计算函数

除了使用回调函数的方式监听状态更新结果之外，React还允许我们传入某个状态计算函数而不是对象来作为第一个参数。状态计算函数能够为我们提供可信赖的组件的State与Props值，即会自动地将我们的状态更新操作添加到队列中并等待前面的更新完毕后传入最新的状态值：
```
   this.setState(function(prevState, props){
      return {showForm: !prevState.showForm}
   });
```
这里我们以简单的计数器为例，我们希望用户点击按钮之后将计数值连加两次，基本的组件为：
```
class Counter extends React.Component{
  constructor(props){
    super(props);
    this.state = {count : 0} 
    this.incrementCount = this.incrementCount.bind(this)
  }
  incrementCount(){
    ...
  }
  render(){
    return <div>
              <button onClick={this.incrementCount}>Increment</button>
              <div>{this.state.count}</div>
          </div>
  }
}
```
直观的写法我们可以连续调用两次`setState`函数，这边的用法可能看起来有点怪异，不过更多的是为了说明异步更新带来的数据不可预测问题。
```
  incrementCount(){
    this.setState({count : this.state.count + 1}) 
    this.setState({count : this.state.count + 1})
  }
```
上述代码的效果是每次点击之后计数值只会加1，实际上第二个`setState`并没有等待第一个`setState`执行完毕就开始执行了，因此其依赖的当前计数值完全是错的。我们当然可以使用上文提及的`setStateAsync`来进行同步控制，不过这里我们使用状态计算函数来保证同步性：
```
  incrementCount(){
   this.setState((prevState, props) => ({
      count: prevState.count + 1
    }));
   this.setState((prevState, props) => ({
      count: prevState.count + 1
    }));
  }
```
这里的第二个`setState`传入的`prevState`值就是第一个`setState`执行完毕之后的计数值，也顺利保证了连续自增两次。

# JavaScript Immutablitiy

## 原生不可变性实现

## immutablitiy-helper

## ImmutableJS

# State 结构设计

接下来我们一起讨论下State的结构设计问题，在复杂组件中，我们可能需要在但单组件内维持复杂的具有项目依赖关系的状态数据，譬如在经典的TODOList组件中，我们首先需要保存当前全部的待做事项数据：
```
const initialState = [
    { id: 1, text: 'laundry' },
    { id: 2, text: 'shopping' }
    // ...
]

class List extends React.Component {

    state = {
        todos: initialState
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
                </ul>
            </div>
        )
    }

}
```
当你以为你大功告成的时候，产品经理让你添加一个搜索框，可以根据用户输入的内容动态地过滤列表显示内容。估计很多开发者会根据直觉写出如下代码：
```

class List extends React.Component {

    state = {
        todos: initialState,
        filteredTodos: null
    }

    search(searchText) {
        const filteredTodos = this.state.todos.filter(todo => todo.text.indexOf(searchText) > 0)
        this.setState({ filteredTodos: filteredTodos })
    }

    render() {
        // get todos from state
        const {filteredTodos, todos} = this.state

        // if there are filtered todos use them
        const list = filteredTodos === null ? todos : filteredTodos

        return (
            <div>
                <SearchBox onChange={this.search} />
                <ul>
                    {list.map(todo => <li key={todo.id}>{todo.text}</li>)}
                </ul>
            </div>
        )
    }

}
```
从功能上来说，这段代码没有问题，但是其将Todos数据保存到了两个不同的列表中，这就导致了相同的数据被保存到了两个地方，不仅造成了数据存储的冗余，还会为我们未来的修改造成不便。譬如用户可能需要在过滤之后修改某个Todo项目的属性，那么此时便需要同时改变`todos `与`filteredTodos `这两个属性的数据方可。在State的结构设计时，我们应该遵循尽可能地保证其最小化原则，在此考虑下我们的组件可以修改为：
```

class List extends React.Component {

    state = {
        todos: initialState,
        searchText: null
    }

    search(searchText) {
        this.setState({ searchText: searchText })
    }

    filter(todos) {
        if (!this.state.searchText) {
            return todos
        }

        return todos.filter(todo => todo.text.indexOf(this.state.searchText) > 0)
    }

    render() {
        const {todos} = this.state

        return (
            <div>
                <SearchBox onChange={this.search} />
                <ul>
                    {this.filter(todos).map(todo => <li key={todo.id}>{todo.text}</li>)}
                </ul>
            </div>
        )
    }

}
```