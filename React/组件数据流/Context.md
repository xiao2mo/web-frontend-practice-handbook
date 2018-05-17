[![返回目录](https://parg.co/UY3)](https://parg.co/U0I)

# Context 详解

# 老版本的 Context API

如果希望在组件中使用 `Context`，我们需要引入 `contextTypes`、`getChildContext`、`childContextTypes` 这三个属性：

- getChildContext: 该函数是父组件的类函数之一，它会返回子函数中获取到的 `this.context` 的值内容，因此我们需要在这里设置子函数能够返回的属性信息。

- childContextTypes: 该对象用于描述 `getChildContext` 返回值的数据结构，其会起到类似于 `propTyps` 这样的类型校验功能。

- contextTypes: 该对象在子组件中用于描述父组件提供的上下文数据结构，可以将它看做子组件对于父组件的请求，同时也会起到类型检测的作用。

参考 React 官方示例，我们可以通过如下方式来使用 Context 跨层传递数据：

```js
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    return (
      <button style={{ background: this.context.color }}>
        {this.props.children}
      </button>
    );
  }
}

Button.contextTypes = {
  color: PropTypes.string
};

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
  getChildContext() {
    return { color: 'purple' };
  }

  render() {
    const children = this.props.messages.map(message => (
      <Message text={message.text} />
    ));
    return <div>{children}</div>;
  }
}

MessageList.childContextTypes = {
  color: PropTypes.string
};
```

通过为 MessageList 组件添加 childContextTypes 与 getChildContext 属性，React 会自动将 getChildContext 返回的值传递到子组件树中。不过，React 官方并不建议我们大量使用 Context，原因概括为以下几点：

* 老版本的 Context API 允许以 Props 方式透传，其问题在于破坏了组件本身的可移植性，或者说是分形架构，增强了组件间的耦合度。所谓的分形架构，即组件树中的任一部分能够被独立抽取使用，并且方便移植到其他组件树中。(参考[诚身](https://www.zhihu.com/question/267168180/answer/319754359)的回答)

* 尽管其可以减少逐层传递带来的冗余代码，尽量的解耦和组件，但是当构造复杂时，我们也会陷入抽象漏洞，无法去判断 `Context` 到底是哪个父组件提供的。此时 `Context` 就像所谓的全局变量一样，大量的全局变量的使用会导致组件的不可以预测性，导致整个系统的鲁棒性降低。

* `Context` 并不会触发组件重渲染，如果组件树中的某个组件的 `shouldComponentUpdate` 函数返回 `false` 而避免了子层组件的重渲染，那么新的 Context 值也就无法传递到子层组件，而导致目标组件无法保证自己每次都可以接收到更新后的 Context 值。

# Context 基本使用

[CodeSandbox/Context](https://codesandbox.io/embed/1yx4kl1jz7)

```js
const ThemeContext = React.createContext('dark');

export const { Consumer, Provider } = ThemeContext;

// This is a HOC function.
// It takes a component...
export default function withTheme(Component) {
  // ...and returns another component...
  return function ThemedComponent(props) {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well
    return (
      <Consumer>{theme => <Component {...props} theme={theme} />}</Consumer>
    );
  };
}
```

```js
function Header({ children, theme }) {
  return <h1 className={`header-${theme}`}>{children}</h1>;
}

// Use the withTheme HOC to inject the context theme,
// Without having to bloat our component to reference it:
export default withTheme(Header);
```

# Context 用于状态管理

如前文所述，React 单组件中允许使用 setState 进行状态管理，而对于组件树，我们可以使用 Props 逐层传递状态值与回调函数。不过这种方式无形会导致多层组件间的强耦合，并且会导致大量的冗余代码。像 Redux, MobX 这样的状态管理框架，它们的作用之一就是将状态代码独立于组件，并未多层组件提供直接的数据流通通道；实际上我们也可以利用 Context API 进行跨层组件间的数据传递，来构建简单的状态管理工具。[Unstated](https://github.com/jamiebuilds/unstated) 就是对于 Context API 进行简要封装形成的状态管理库，它并不需要开发者学习额外的 API 或者库用法，而只需要使用普通的 React 组件中的 setState 方法操作 state，并利用 Context 将其传递到子组件中。Unstated 中主要包含了 Container，Subscribe 以及 Provider 三个组件，其中 Provider 负责存放所有的内部状态实例，类似于 Redux 或者 Apollo 中的 Provider：

```js
const App = () => (
  <Provider>
    <Main />
  </Provider>
);
```

Unstated 会在内部创建 Context 对象，并在 Provider 中包裹 Context.Provider 对象：

```js
const StateContext = createReactContext(null);

...

export function Provider(props: ProviderProps) {
  return (
    // 集成父组件中的 Provider
    <StateContext.Consumer>
      {
        ...
        return (
          <StateContext.Provider value={childMap}>
            {props.children}
          </StateContext.Provider>
        );
      }}
    </StateContext.Consumer>
  );
}
```

Container 是朴素的拥有 setState 方法的 JavaScript 类，其仅负责进行状态操作，其用法如下：

```js
// BookContainer.js
import { Container } from 'unstated';
class BookContainer extends Container {
  state = {
    books: [],
    booksVisible: false
  };
  addBook = book => {
    const books = [...this.state.books];
    books.push(book);
    this.setState({ books });
  };
  toggleVisibility = () => {
    this.setState({
      booksVisible: !this.state.booksVisible
    });
  };
}
export { BookContainer };
```

参考 Container 的源代码，可以发现其主要是对 setState 进行了复写：

```js
...
setState(state: $Shape<State>) {
  this.state = Object.assign({}, this.state, state);
  this._listeners.forEach(fn => fn());
}
...
```

Subscribe 组件则提供了将 Container 实例传递给自定义组件的媒介，当状态变化时，组件会进行自动渲染：

```js
<Subscribe to={[BookContainer, CounterContainer]}>
  {(bookStore, counterStore) => {
      const { state: { books, booksVisible } } = bookStore
      {
        booksVisible && books.map((book, index) => (
          <div>
            <p>{book.name}</p>
            <p>{book.author}</p>
          </div>
        )
      }
  }}
</Subscribe>
```

Subscribe 在组件内提供了 Context.Consumer 包裹，并且自动创建 Container/Store 实例：

```js
instance = new Container();
safeMap.set(Container, instance);

...

render() {
  return (
    <StateContext.Consumer>
      {map =>
        this.props.children.apply(
          null,
          this._createInstances(map, this.props.to)
        )
      }
    </StateContext.Consumer>
  );
}
```
