# MobX 与 React 的完美结合
与当前 React 上最受欢迎的状态管理工具 Redux 相比，Mobx 具有更好的灵活性，同时简化了流程，使得开发效率更高。但是同样的，也失去了 Redux 强大的中间件功能和 immutable data 特性。总的来说，二者各有千秋，MobX 更加适合小规模的应用。

## mobx-react
`mobx-react` 是连接 MobX store 和 React 组件的桥梁，使用 `mobx-react`，可以方便的进行 store 注入，注册组件为观察者等等。下面，让我们学习一下它的详细用法。

## 安装
`npm install mobx-react --save`

## 主要 API

### observer
`observer` 是最核心的 API，作用是将组件转换为响应式组件，使用方法如下：
```
import {observer} from "mobx-react";

// ---- ES5 syntax ----

const TodoView = observer(React.createClass({
    displayName: "TodoView",
    render() {
        return <div>{this.props.todo.title}</div>
    }
}));

// ---- ES6 syntax ----

const TodoView  = observer(class TodoView extends React.Component {
    render() {
        return <div>{this.props.todo.title}</div>
    }
})

// ---- ESNext syntax with decorators ----

@observer class TodoView extends React.Component {
    render() {
        return <div>{this.props.todo.title}</div>
    }
}

// ---- or just use a stateless component function: ----

const TodoView = observer(({todo}) => <div>{todo.title}</div>)
```
那么，什么样的组件才需要被转换为响应式组件呢？请记住一个最简单的规则，把那些接收 observable 数据的组件转换为响应式组件，如果不想转换的话，就把数据处理为普通数据后再传递进去。

### Provider 和 inject
`Provider` 的作用是利用 React context 传递 store，这样就避免了层层传递，而 `inject` 的作用是捕获指定的 store 并将其注入到组件的 `props` 对象中。
```
import { inject, observer, Provider } from 'mobx-react';

@inject("color") @observer
class Button extends React.Component {
  render() {
    return (
      <button style={{background: this.props.color}}>
        {this.props.children}
      </button>
    );
  }
}

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} <Button>Delete</Button>
      </div>
    );
  }
}

class MessageList extends React.Component {
  render() {
    const children = this.props.messages.map((message) =>
      <Message text={message.text} />
    );
    return <Provider color="red">
        <div>
            {children}
        </div>
    </Provider>;
  }
}

```
使用 `inject` 需要注意几点：
- 如果组件有和 store 同名的属性，组件的属性优先级更高，也就是说 store 不会被注入组件的 props 中。
- 同时使用 `@inject` 和 `@observer` 时，必须按照正确的顺序，即 `@inject` 在外层，`@observer` 在内层。

#### 自定义 `inject`
除了传入 store 名之外，还可以自定义一个一个函数来控制注入内容，让我们来看一个例子：
```
const NameDisplayer = ({ name }) => <h1>{name}</h1>

const UserNameDisplayer = inject(

    // 自定义映射函数
    stores => ({
        name: stores.userStore.name
    })
)(NameDisplayer)

const user = mobx.observable({
    name: "Noa"
})

const App = () => (
    <Provider userStore={user}>
        <UserNameDisplayer />
    </Provider>
)

ReactDOM.render(<App />, document.body)
```
自定义的映射函数接收所有的 store 作为第一个参数，返回的结果将会被注入组件的 props 中，使用自定义 `inject` 方法可以更精确的控制注入组件的内容。

### componentWillReact
`mobx-react` 还提供了一个新的生命周期方法 `componentWllReact()`。此方法没有参数，会在每次组件监听的数据发生变化，组件即将重新渲染之前触发。
```
import {observer} from "mobx-react";

@observer class TodoView extends React.Component {
    componentWillReact() {
        console.log("I will re-render, since the todo has changed!");
    }

    render() {
        return <div>{this.props.todo.title}</div>
    }
}
```
这个方法在第一次渲染之前不会触发。

### PropTypes
`mobx-react` 提供了 observable 相关类型的 PropTypes，使用之前需要先引入：
```
import { PropTypes } from 'mobx-react';
```
observable 相关的类型有：
- `observableArray`
- `observableArrayOf(React.PropTypes.number)`
- `observableMap`
- `observableObject`
- `arrayOrObservableArray`
- `arrayOrObservableArrayOf(React.PropTypes.number)`
- `objectOrObservableObject`