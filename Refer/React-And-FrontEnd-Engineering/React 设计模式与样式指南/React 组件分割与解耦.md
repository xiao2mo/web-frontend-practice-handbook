# React 组件分割与解耦

# 展示型组件与容器组件

React 中组件往往分为展示型组件（Presentational 或者 Dumb）与容器组件（Container 或者 Container）两大类。其中容器组件往往会包含内部状态

```
class SmartComponent01 extends Component {
  manageSomeData () {
    /* ... */
  }
  makeSomeCalculations () {
    /* ... */
  }
  handleSomeEvent = (event) => {
    /* ... */
  }

  render() {
    return (
      <div>
        <DumpComponent01 data={/*...*/} />
        <DumpComponent02 func={/*...*/} />
      </div>
    )
  }
}
```

# 提取组件中的业务逻辑

编写 React 组件时我们往往会将业务逻辑相关的代码封装在组件类内，譬如笔者在 [fractal-components]() 组件库中实现的简单展示金额信息的组件：
```
class Money extends Component {
  static propTypes = {
    currency: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }

  getCurrencyData() {
    return {
      CNY: { base: 100, symbol: '￥' },
      ...
    }[this.props.currency]
  }

  formatAmount(amount, base) {
    return parseFloat(amount / base).toFixed(2)
  }

  render() {
    const currency = this.getCurrencyData()
    ...
  }
}
```
组件本身只是用来进行界面渲染与交互处理的，而在上面的 Money 组件中，为了对于传入的金额信息进行格式化，内置了 getCurrencyData 与 formatAmount 这两个辅助函数。getCurrencyData 根据输入的金额类型返回不同的基准值与金额符号，实际上随着应用支持国家或语言的增加，该函数会不断地增长；因此该函数是可以被独立提取出来到单独的逻辑文件中。而 formatAmount 用于针对金额的类型与大小进行合适的格式化，可以预见同样随着支持语言的增加我们需要不断扩充该函数。另一方面，笔者在函数式编程的介绍中也提及，纯函数相较于类方法更容易进行单元测试，因此我们将这两个函数提取出来不仅能实践单一职责原则，保证组件类的可读性；还能更方便地编写这些逻辑函数的单元测试用例。我们首先将这两个函数提取到单独的 logic.js 文件中：
```
export const getCurrencyData = currency => {
  return {
    ...
  }[currency];
};

export const formatAmount = (amount, base) => {
  return parseFloat(amount / base).toFixed(2);
};
```
然后可以编写针对这两个函数的测试用例：
```
test('it formats the amount to 2 dp', () => {
  expect(formatAmount(2000, 100)).toEqual('20.00')
})

test('respects the base', () => {
  expect(formatAmount(2000, 10)).toEqual('200.00')
})

test('it deals with decimal places correctly', () => {
  expect(formatAmount(2050, 100)).toEqual('20.50')
})

test('for GBP it returns the right data', () => {
  expect(getCurrencyData('GBP')).toEqual({
    base: 100,
    symbol: '£',
  })
})
```
此时 Money 组件中仅保留了单独的 `render` 方法，我们自然可以将该组件重构为无状态函数式组件，在进行逻辑分割的同时提升了组件性能：
```
const Money = ({ currency, amount }) => {
  const currencyData = getCurrencyData(currency);
  ...
};

Money.propTypes = {
  currency: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired
};
```
软件开发的工程本身就是不断地重构，通过将组件中的业务逻辑处理流程提取为独立函数，我们不仅简化了组件本身的代码，还同时提升了测试覆盖率与组件的性能。在；而在代码可读性提升的同时，我们也更容易发现


# 异步加载组件

> [React 16 中的异常处理]()翻译自[ React 官方文档]()，从属于笔者的[ React 与前端工程化实践](https://parg.co/bIn)系列中的[ React 组件分割与解耦]()章节；也可以使用[ create-webpack-app ](https://parg.co/bWI) 运行本部分示例 。

# 异常处理

在 React 15.x 及之前的版本中，组件内的异常有可能会影响到 React 的内部状态，进而导致下一轮渲染时出现未知错误。这些组件内的异常往往也是由应用代码本身抛出，在之前版本的 React 更多的是交托给了开发者处理，而没有提供较好地组件内优雅处理这些异常的方式。在 React 16.x 版本中，引入了所谓 Error Boundary 的概念，从而保证了发生在 UI 层的错误不会连锁导致整个应用程序崩溃；未被任何异常边界捕获的异常可能会导致整个 React 组件树被卸载。所谓的异常边界即指某个能够捕获它的子元素（包括嵌套子元素等）抛出的异常，并且根据用户配置进行优雅降级地显示而不是导致整个组件树崩溃。异常边界能够捕获渲染函数、生命周期回调以及整个组件树的构造函数中抛出的异常。
我们可以通过为某个组件添加新的 `componentDidCatch(error, info)` 生命周期回调来使其变为异常边界：
```
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```
然后我们就可以如常使用该组件：
```
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```
`componentDidCatch()` 方法就好像针对组件的 `catch {}` 代码块；不过 JavaScript 中的 `try/catch` 模式更多的是面向命令式代码，而 React 组件本身是声明式模式，因此更适合采用指定渲染对象的模式。需要注意的是仅有类组件可以成为异常边界，在真实的应与开发中我们往往会声明单个异常边界然后在所有可能抛出异常的组件中使用它。另外值得一提的是异常边界并不能捕获其本身的异常，如果异常边界组件本身抛出了异常，那么会冒泡传递到上一层最近的异常边界中。
在真实地应用开发中有的开发者也会将崩坏的界面直接展示给开发者，不过譬如在某个聊天界面中，如果在出现异常的情况下仍然直接将界面展示给用户，就有可能导致用户将信息发送给错误的接受者；或者在某些支付应用中导致用户金额显示错误。因此如果我们将应用升级到 React 16.x，我们需要将原本应用中没有被处理地异常统一包裹进异常边界中。譬如某个应用中可能会分为侧边栏、信息面板、会话界面、信息输入等几个不同的模块，我们可以将这些模块包裹进不同的错误边界中；这样如果某个组件发生崩溃，会被其直属的异常边界捕获，从而保证剩余的部分依然处于可用状态。同样的我们也可以在异常边界中添加错误反馈等服务接口以及时反馈生产环境下的异常并且修复他们。完整的应用代码如下所示：
```
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }
  
  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}

function App() {
  return (
    <div>
      <p>
        <b>
          This is an example of error boundaries in React 16.
          <br /><br />
          Click on the numbers to increase the counters.
          <br />
          The counter is programmed to throw when it reaches 5. This simulates a JavaScript error in a component.
        </b>
      </p>
      <hr />
      <ErrorBoundary>
        <p>These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.</p>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>
      <hr />
      <p>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
    </div>
  );
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
);

```

