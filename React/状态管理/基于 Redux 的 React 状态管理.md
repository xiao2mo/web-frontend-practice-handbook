[![返回目录](https://parg.co/UY3)](https://parg.co/U0I)

# Introduction

React Redux 是官方提供的 Redux 与 React 的绑定库，用于将 Redux 中的 State 与 Action Creators 映射到 React 组件的 Props。本组件的设计思想可以查看[Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.6bnhmpqtg)，即将展示组件与容器组件分离，将展示组件尽可能地作为 Stateless 对待。在应用中，只有最顶层组件是对 Redux 可知(例如路由处理)这是很好的。所有它们的子组件都应该是“笨拙”的，并且是通过 props 获取数据。

|            | 容器组件              | 展示组件              |
| ---------- | --------------------- | --------------------- |
| 位置       | 最顶层，路由处理      | 中间和子组件          |
| 使用 Redux | 是                    | 否                    |
| 读取数据   | 从 Redux 获取 state   | 从 props 获取数据     |
| 修改数据   | 向 Redux 发起 actions | 从 props 调用回调函数 |

![](http://p9.qhimg.com/d/inn/a8ab3ea4/react-redux.png)

- 展示组件中不接入 Redux
  让我们看下，我们拥有一个 <Counter /> 的展示组件，它有一个通过 props 传过来的值，和一个函数 onIncrement，当你点击 “Increment” 按钮时就会调用这个函数：

```js
export default class Counter extends Component {
  render() {
    return <button onClick={this.props.onIncrement}>{this.props.value}</button>;
  }
}
```

安装的话只需要：

```
npm install --save react-redux
```

我们用 react-redux 提供的 connect() 方法将“笨拙”的 Counter 转化成容器组件。connect() 允许你从 Redux store 中指定准确的 state 到你想要获取的组件中。这让你能获取到任何级别颗粒度的数据。首先来看下一个简单的 Counter 的示例：

```js
export default class Counter extends Component {
  render() {
    return <button onClick={this.props.onIncrement}>{this.props.value}</button>;
  }
}
```

```js
// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
  return {
    value: state.counter
  };
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
  return {
    onIncrement: () => dispatch(increment())
  };
}

/**或者也可以使用bindActionCreators
//将Dispatch映射为Props
...
import * as CounterActions from "../actions/counter";
...
function mapDispatchToProps(dispatch) {
    return bindActionCreators(CounterActions, dispatch)
}
**/

// 你可以传递一个对象，而不是定义一个 `mapDispatchToProps`：
// export default connect(mapStateToProps, CounterActionCreators)(Counter);

// 或者如果你想省略 `mapDispatchToProps`，你可以通过传递一个 `dispatch` 作为一个 props：
// export default connect(mapStateToProps)(Counter);

let App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
const targetEl = document.getElementById('root');
const store = configureStore({ counter: 0 }); //初始化Store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  targetEl
);
```

# Provider & Store

`<Provider store>` 使组件层级中的 connect() 方法都能够获得 Redux store。正常情况下，你的根组件应该嵌套在 `<Provider>` 中才能使用 connect() 方法。如果你真的不想把根组件嵌套在 `<Provider>`中，你可以把 store 作为 props 传递到每一个被 connet() 包装的组件，但是我们只推荐您在单元测试中对 store 进行伪造 (stub) 或者在非完全基于 React 的代码中才这样做。正常情况下，你应该使用 `<Provider>`。
属性

- store (Redux Store): 应用程序中唯一的 Redux store 对象
- children (ReactElement) 组件层级的根组件。

## React-Router

一般在项目中，我们经常需要集成 React-Router。

- React Router 0.13

```
Router.run(routes, Router.HistoryLocation, (Handler, routerState) => { // 注意这里的 "routerState"
  ReactDOM.render(
    <Provider store={store}>
      {/* 注意这里的 "routerState": 该变量应该传递到子组件 */}
      <Handler routerState={routerState} />
    </Provider>,
    document.getElementById('root')
  );
});
```

- React Router 1.0

```
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>...</Router>
  </Provider>,
  targetEl
);
```

# connect:连接 React 组件与 Redux store。

```
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
```

连接操作不会改变原来的组件类，反而返回一个新的已与 Redux store 连接的组件类。

## 参数解析

### mapStateToProps

[mapStateToProps(state, [ownProps]): stateProps](Function): 如果定义该参数，组件将会监听 Redux store 的变化。任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用。该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并。如果你省略了这个参数，你的组件将不会监听 Redux store。如果指定了该回调函数中的第二个参数 ownProps，则该参数的值为传递到组件的 props，而且只要组件接收到新的 props，mapStateToProps 也会被调用。

### mapDispatchToProps

[mapDispatchToProps(dispatch, [ownProps]): dispatchProps] (Object or Function): 如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，而且这个对象会与 Redux store 绑定在一起，其中所定义的方法名将作为属性名，合并到组件的 props 中。如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象，这个对象通过 dispatch 函数与 action creator 以某种方式绑定在一起(提示：你也许会用到 Redux 的辅助函数 bindActionCreators())。如果你省略这个 mapDispatchToProps 参数，默认情况下，dispatch 会注入到你的组件 props 中。如果指定了该回调函数中第二个参数 ownProps，该参数的值为传递到组件的 props，而且只要组件接收到新 props，mapDispatchToProps 也会被调用。

### mergeProps

[mergeProps(stateProps, dispatchProps, ownProps): props](Function): 如果指定了这个参数，mapStateToProps() 与 mapDispatchToProps() 的执行结果和组件自身的 props 将传入到这个回调函数中。该回调函数返回的对象将作为 props 传递到被包装的组件中。你也许可以用这个回调函数，根据组件的 props 来筛选部分的 state 数据，或者把 props 中的某个特定变量与 action creator 绑定在一起。如果你省略这个参数，默认情况下返回 Object.assign({}, ownProps, stateProps, dispatchProps) 的结果。

### options

[options](Object) 如果指定这个参数，可以定制 connector 的行为。

- [pure = true](Boolean): 如果为 true，connector 将执行 shouldComponentUpdate 并且浅对比 mergeProps 的结果，避免不必要的更新，前提是当前组件是一个“纯”组件，它不依赖于任何的输入或 state 而只依赖于 props 和 Redux store 的 state。默认值为 true。
- [withRef = false](Boolean): 如果为 true，connector 会保存一个对被包装组件实例的引用，该引用通过 getWrappedInstance() 方法获得。默认值为 false

## Examples

- 只注入 `dispatch`，不监听 store

```
export default connect()(TodoApp);

```

- 注入 `dispatch` 和全局 state

> 不要这样做！这会导致每次 action 都触发整个 `TodoApp` 重新渲染，你做的所有性能优化都将付之东流。
>
> 最好在多个组件上使用 `connect()`，每个组件只监听它所关联的部分 state。

```
export default connect(state => state)(TodoApp);

```

- 注入 `dispatch` 和 `todos`

```
function mapStateToProps(state) {
  return { todos: state.todos };
}

export default connect(mapStateToProps)(TodoApp);

```

- 注入 `todos` 和所有 action creator (`addTodo`, `completeTodo`, ...)

```
import * as actionCreators from './actionCreators';

function mapStateToProps(state) {
  return { todos: state.todos };
}

export default connect(mapStateToProps, actionCreators)(TodoApp);

```

- 注入 `todos` 并把所有 action creator 作为 `actions` 属性也注入组件中

```
import * as actionCreators from './actionCreators';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return { todos: state.todos };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);

```

- 注入 `todos` 和指定的 action creator (`addTodo`)

```
import { addTodo } from './actionCreators';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return { todos: state.todos };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addTodo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);

```

- 注入 `todos` 并把 todoActionCreators 作为 `todoActions` 属性、counterActionCreators 作为 `counterActions` 属性注入到组件中

```
import * as todoActionCreators from './todoActionCreators';
import * as counterActionCreators from './counterActionCreators';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return { todos: state.todos };
}

function mapDispatchToProps(dispatch) {
  return {
    todoActions: bindActionCreators(todoActionCreators, dispatch),
    counterActions: bindActionCreators(counterActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);

```

- 注入 `todos` 并把 todoActionCreators 与 counterActionCreators 一同作为 `actions` 属性注入到组件中

```
import * as todoActionCreators from './todoActionCreators';
import * as counterActionCreators from './counterActionCreators';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return { todos: state.todos };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, todoActionCreators, counterActionCreators), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);

```

- 注入 `todos` 并把所有的 todoActionCreators 和 counterActionCreators 作为 props 注入到组件中

```
import * as todoActionCreators from './todoActionCreators';
import * as counterActionCreators from './counterActionCreators';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return { todos: state.todos };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, todoActionCreators, counterActionCreators), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);

```

- 根据组件的 props 注入特定用户的 `todos`

```
import * as actionCreators from './actionCreators';

function mapStateToProps(state, ownProps) {
  return { todos: state.todos[ownProps.userId] };
}

export default connect(mapStateToProps)(TodoApp);

```

- 根据组件的 props 注入特定用户的 `todos` 并把 `props.userId` 传入到 action 中

```
import * as actionCreators from './actionCreators';

function mapStateToProps(state) {
  return { todos: state.todos };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    todos: stateProps.todos[ownProps.userId],
    addTodo: (text) => dispatchProps.addTodo(ownProps.userId, text)
  });
}

export default connect(mapStateToProps, actionCreators, mergeProps)(TodoApp);

```

# [React Router](https://github.com/reactjs/react-router-redux):保证 Redux 与 React-Router 同步

## Basic Usage

- 安装方式：

```
npm install --save react-router-redux
```

- 简单示例

```
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import reducers from '<project-path>/reducers'

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="foo" component={Foo}/>
        <Route path="bar" component={Bar}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('mount')
)
```

## Router State

### Params:Router 的参数

在 React Router 中可以通过本身组件的 Props 来传递路由参数，而在 React-Redux 中因为是采用了`connect()`方法将 State 映射到了 Props 中，因此需要采用`mapStateToProps`中的第二个参数进行路由映射：

```
function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.params.id,
    filter: ownProps.location.query.filter
  };
}
```

### History

如果有时候需要对于你的路由的历史进行监控的话，可以采用如下的方案：

```
const history = syncHistoryWithStore(browserHistory, store)

history.listen(location => analyticsService.track(location.pathname))
```

## Navigation Control

### issue navigation events via Redux actions

```
import { routerMiddleware, push } from 'react-router-redux'

// Apply the middleware to the store
const middleware = routerMiddleware(browserHistory)
const store = createStore(
  reducers,
  applyMiddleware(middleware)
)

// Dispatch from anywhere like normal.
store.dispatch(push('/foo'))
```

# form:[redux-form](http://redux-form.com/5.2.3/#/getting-started?_k=3clhs7)

## Simple Form

如果在 Redux Form 中需要手动地设置值，应该在 Field 的`onChange`方法中进行修改，譬如：

```
<Select
    className="result_columns"
    placeholder="请选择关联列"
    multiple
    defaultValue={result_columns.value || []}
    onChange={(value)=>{
            result_columns.onChange(value);
        }}>
    <Option value="1">列1</Option>
    <Option value="2">列2</Option>
    <Option value="3">列3</Option>
</Select>
```

这一特性常常用于在自定义组件中进行值设置，

## Initial Form Values

```
import { React, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { reduxForm } from 'redux-form'
import { registerPerson } from 'actions/coolStuff'

@connect(null, dispatch => ({
  registerPerson: bindActionCreators(registerPerson, dispatch)
}))
export default class ExampleComponent extends Component {
  render() {
    const myInitialValues = {
      initialValues: {
        name: 'John Doe',
        age: 42,
        fruitPreference: 'apples'
      }
    }
    return (
      <div>
        <h1>Check out my cool form!</h1>
        <CoolForm  {...myInitialValues} onSubmit={(fields) => {this.props.registerPerson(fields)}} />
      </div>
    )
  }
}

@reduxForm({
  form: 'exampleForm',
  fields: ['name', 'age', 'fruitPreference']
})
class CoolForm extends Component {
  render() {
    const { fields: {name, age, fruitPreference}, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type='text' {...name} />
        <label>Age</label>
        <input type='text' {...age} />
        <label>Do you prefer apples or oranges?</label>
        <select {...fruitPreference}>
          <option value="apples">Apples</option>
          <option value="oranges">Oranges</option>
        </select>
        <button type='submit' onClick={handleSubmit}>Submit</button>
      </form>
    )
  }
}
```
