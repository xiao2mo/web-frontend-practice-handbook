[![返回目录](https://parg.co/US3)](https://parg.co/UGZ)

# Redux 异步处理

在上一节中，我们讨论了 Action 与 Action Creator 的基本概念，但是在上文讨论的都是 Sync Action Creator，即每个 Action Creator 都是 Pure Function。而我们在实际的应用程序中经常会有一个需求，即是网络请求。网络请求往往附带着延迟，即从触发请求开始到实际获得数据并分发肯定会存在时间间隔，因此，我们在这种情况下需要的不仅仅是同步的 Action Creators，还有异步的 Action Creator。实际上对于如何实践异步的 Action Creator 也是见仁见智，笔者在这里会介绍几种常见的用法，各人也可以按照个人的认知与喜好进行选择使用。

本部分介绍的 Thunk, PromiseMiddleware, Sagas 这三种方式本质上都是通过自定义 Redux Middleware 来实现对于异步事件的处理。

# Thunk

Thunk 这个单词有点拗口，其代指那些包含了可以延时求值的表达式的函数，譬如下面的代码对比：

```
// 计算 1 + 2 的过程是立即发生的
// x === 3
let x = 1 + 2;

// 这里计算 1 + 2 的过程是可以延迟进行的，即当调用 foo 函数时才进行真正的求职，那么 foo 就被称为 thunk
let foo = () => 1 + 2;
```

而 Redux 中的 Thunk 即是代指那些在某个时间间隔之后再分发 Action 的函数，该中间件允许你在编写 Action Creators 的时候返回一个参数为`dispatch`与`getState`的函数而不是一个 Action 本身。Thunk 可以用来延时分发该 Action，或者根据条件判断的结果来分发 Action。在项目中引入 redux-thunk 的方法也很简单，首先使用`npm`命令安装相关依赖:

```
npm install --save redux-thunk
```

然后使用`applyMiddleware`函数来引用 Thunk 中间件:

```
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

// Note: this API requires redux@>=3.1.0
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
```

配置完毕之后，我们即可以编写返回值为函数的 ActionCreator 函数了，这里我们还是以计数器为例，普通的计数器是瞬时进行加一操作，而这里我们希望延时 1s 进行加一操作：

```
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      // 这里同样可以使用 dispatch 调用其他同步或者异步函数
      dispatch(increment());
    }, 1000);
  };
}
```

同样我们也可以根据当前状态来判断分发不同的事件，譬如我们希望仅当奇数时进行加一操作：

```
function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}
```

下面我们来讨论稍微复杂点的例子，在应用开发中我们经常需要设计消息提示组件，典型的使用场景譬如用户点击某个按钮之后弹出消息提示框，等待几秒后提示框自动关闭。传统的以 DOM 操作为核心的开发中会选择直接显示或者隐藏窗体的方式，而基于 Redux 的开发中我们只能通过改变全局状态来控制提示框的显示隐藏。首先我们需要定义基本的 Action 与 ActionCreator:

```
const notificationId = 0;

const notificationActions = {
  show: function(text, id) {
    return { type: 'SHOW_NOTIFICATION', text: text, id: id || notificationId++ }
  },

  hide: function(id) {
    return { type: 'HIDE_NOTIFICATION', id: id }
  },

  showTimed: function(text) {
    return function(dispatch) {
      const id = notificationId++;

      dispatch(this.show(text, id))

      setTimeout(() => {
        dispatch(this.hide(id)
      }, 5000)
    }
  }
}
```

在上述代码片中可以看出，我们特意将`show`与`hide`两个纯函数与异步处理函数剥离开来，这样会更加地符合单一职责原则，也保证了代码的可复用性。而我们在组件中，根据用户的响应直接调用`setTimed`函数即可：

```
function NotifyButton(props) {
  return <button onClick={() => props.showTimedNotification('Awesome notification')}>Notify Me!</button>
}

export default connect(null, {
  showTimedNotification: notificationActions.showTimed
})(NotifyButton)
```

这里我们使用 react-redux 提供的 connect 函数来连接组件与状态存储。到这里我们可以感觉到，Thunk 非常的简单易用，其也是 Redux 生态系统中非常重要的组成部分，几乎每个应用中都可以发现它的身影。不过简单也有其代价，因为 Thunk 是直接返回的函数而不是某个朴素对象，我们也就无法序列化地记录 Action 的触发顺序，复杂逻辑下很难去调试。并且 Thunk 允许每个 Action Creator 中都进行任意的逻辑操作，本身也不是较强的束缚，这样就不利于整体的代码分割。譬如我们的应用中常常会出现如下与服务端进行数据交互的代码：

```
function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`http://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}
```

上述代码片单独看来无甚大碍，不过某个应用中往往会包含多个请求，我们不希望在每个逻辑函数的地方都要构造一个 fetch 对象来进行 API 请求。我们更希望返回单个描述 Action 的基本对象，譬如：

```
  return {
    REDDIT_API: {
      type: 'GET_SUBREDDIT',
      path: `/r/${id}.json`
    }
  }
```

```
// thunk1
export function fetchPublishedPosts() {
  return async function (dispatch, getState) {
    dispatch({type: 'LOADING', loading: true});
    const posts = await postService.fetch('published');
    dispatch({type: 'ADD_POSTS', newPosts: posts});
    dispatch({type: 'LOADING', loading: false});
  };
}

// thunk2
export function fetchUnpublishedPosts() {
  return async function (dispatch, getState) {
    dispatch({type: 'LOADING', loading: true});
    const posts = await postService.fetch('unpublished');
    dispatch({type: 'ADD_POSTS', newPosts: posts});
    dispatch({type: 'LOADING', loading: false});
  };
}

// thunk3
export function fetchAllPosts() {
  return async function (dispatch, getState) {
    const promise1 = dispatch(fetchPublishedPosts());
    const promise2 = dispatch(fetchUnpublishedPosts());
    await Promise.all([promise1, promise2]);
  };
}
```

上文我们一再强调，redux-thunk 本身也是基于 Middleware 的实现，我们自然也可以实现自己的中间件来根据不同的 Action 进行不同的延时响应，这部分就是我们下一节介绍的内容。

```
import { createAction, handleActions } from "redux-actions";
import update from "react-addons-update";
const REQ_STATE = {
    INIT: "@INIT",
    REQUESTING: "@REQUESTING",
    SUCCESS: "@SUCCESS",
    FAILED: "@FAILED"
}
let reqActionAndReducerCreator = (reqName, fetch, initData) => {
    let request = `${reqName}_REQUEST`,
        success = `${reqName}_SUCCESS`,
        failure = `${reqName}_FAILURE`;
    let actions = {
        [request]: createAction(request),
        [success]: createAction(success),
        [failure]: createAction(failure),
    }
    let reducer = handleActions(
        {
            [request]: (state, action) => (update(state, {
                    state: {$set: REQ_STATE.REQUESTING},
                    time: {$set: new Date()}
                })
            ),
            [success]: (state, action) => (update(state, {
                state: {$set: REQ_STATE.SUCCESS},
                data: {$set: action.payload},
                time: {$set: new Date()}
            })),
            [failure]: (state, action) => (update(state, {
                state: {$set: REQ_STATE.FAILED},
                err: {$set: action.payload},
                time: {$set: new Date()}
            })),
        }, {
            state: REQ_STATE.INIT,
            time: new Date(),
            err: null,
            data: initData || null
        }
    );
    let asyncFetch = (...args) =>  (dispatch) => {
        dispatch(actions[request]());
        try {
            let data = fetch(...args);
            dispatch(actions[success](data));
        } catch (e) {
            dispatch(actions[failure](e));
        }
    };
    return {
        reducer: reducer,
        actions: {
            REQUEST: actions[request],
            SUCCESS: actions[success],
            FAILURE: actions[failure]
        },
        asyncReq: asyncFetch
    }
}
export { REQ_STATE };
export default reqActionAndReducerCreator;
```

# PromiseMiddle

我们在服务端开发使用的 Express 或者 Koa 这些框架中经常会使用所谓的中间件(Middleware)，此处的中间件指那些在接收到请求之后、进行响应之前所执行的代码。而 Redux 的中间件的概念则很类似于 Express 或者 Koa 中，其为第三方扩展提供了有效的切入点，使得开发者能够方便地在 Action 到达 Reducer 之前被进行适当的处理，并且在状态更新之后能够根据最新的状态再次进行相应的操作。譬如我们应用中常用的日志功能，需要记录所有的 Action 以及相应的状态变化，我们可以自定义如下的日志中间件：

```
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
```

然后在创建 Store 时，将中间件放入到`createStore`的第二个参数中：

```
import { createStore, combineReducers, applyMiddleware } from 'redux'

let todoApp = combineReducers(reducers)
let store = createStore(
  todoApp,
  // applyMiddleware() tells createStore() how to handle middleware
  applyMiddleware(logger)
)
```

这样中间件就能正常工作了，其分别在分发 Action 与 状态更新后进行相应的触发操作。Redux 的中间件调用流程也是所谓的洋葱圈模型，即先从外至内，再由内而外的过程。譬如我们定义 3 个中间件并且依次添加到 Store 中：

```
function middleware1(store) {
  return function(next) {
    return function(action) {
      console.log('A middleware1 开始');
      next(action)
      console.log('B middleware1 结束');
    };
  };
}

function middleware2(store) {
  return function(next) {
    return function(action) {
      console.log('C middleware2 开始');
      next(action)
      console.log('D middleware2 结束');
    };
  };
}

function middleware3(store) {
  return function(next) {
    return function(action) {
      console.log('E middleware3 开始');
      next(action)
      console.log('F middleware3 结束');
    };
  };
}

function reducer(state, action) {
  if (action.type === 'MIDDLEWARE_TEST') {
    console.log('======= G =======');  
  }
  return {};
}

var store = Redux.createStore(
  reducer,
  Redux.applyMiddleware(
    middleware1,
    middleware2,
    middleware3
  )
);

store.dispatch({ type: 'MIDDLEWARE_TEST' });
```

最后的控制台输出为：

```
A middleware1 开始
C middleware2 开始
E middleware3 开始
======= G =======
F middleware3 结束
D middleware2 结束
B middleware1 结束
```

整个请求的示意图如下：

```
            --------------------------------------
            |            middleware1              |
            |    ----------------------------     |
            |    |       middleware2         |    |
            |    |    -------------------    |    |
            |    |    |  middleware3    |    |    |
            |    |    |                 |    |    |
          next next next  ———————————   |    |    |
dispatch  —————————————> |  reducer  | — 收尾工作->|
nextState <————————————— |     G     |  |    |    |
            | A  | C  | E ——————————— F |  D |  B |
            |    |    |                 |    |    |
            |    |    -------------------    |    |
            |    ----------------------------     |
            --------------------------------------


顺序 A -> C -> E -> G -> F -> D -> B
    \---------------/   \----------/
            ↓                ↓
      更新 state 完毕      收尾工作
```

# Saga

* [Redux Saga 实践](http://yanqiw.github.io/react/2017/03/05/redux-saga.html)

> [advanced-redux-action-types](https://medium.com/@zackargyle/advanced-redux-action-types-d5a71ed44e16#.hngz4r406)

![](http://img2.tuicool.com/JfiYRrM.png!web)

# Simple & Sync Actions:简单的同步 Redux Action

## Action 定义

首先，让我们来给 action 下个定义。**Action** 是把数据从应用(译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 )传到 store 的有效载荷。它是 store 数据的**唯一**来源。一般来说你会通过 [`store.dispatch()`](http://camsong.github.io/redux-in-chinese/docs/api/Store.html#dispatch) 将 action 传到 store。添加新 todo 任务的 action 是这样的：

```json
const ADD_TODO = 'ADD_TODO';

{
  type: 'ADD_TODO',
  text: 'Build my first Redux app'
}
```

Action 本质上是 JavaScript 普通对象。我们约定，action 内使用一个字符串类型的 `type` 字段来表示将要执行的动作。多数情况下，`type` 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。

```javascript
import { ADD_TODO, REMOVE_TODO } from '../actionTypes';
```

> 使用单独的模块或文件来定义 action type 常量并不是必须的，甚至根本不需要定义。对于小应用来说，使用字符串做 action type 更方便些。不过，在大型应用中把它们显式地定义成常量还是利大于弊的。参照 [减少样板代码](http://camsong.github.io/redux-in-chinese/docs/recipes/ReducingBoilerplate.html) 获取保持代码干净的实践经验。

除了 `type` 字段外，action 对象的结构完全由你自己决定。参照 [Flux 标准 Action](https://github.com/acdlite/flux-standard-action) 获取关于如何组织 action 的建议。这时，我们还需要再添加一个 action type 来标记任务完成。因为数据是存放在数组中的，所以我们通过 `index` 来标识任务。实际项目中一般会在新建内容的时候生成唯一的 ID 作为标识。

```
{
  type: COMPLETE_TODO,
  index: 5
}
```

**我们应该尽量减少在 action 中传递的数据**。比如上面的例子，传递 `index` 就比把整个任务对象传过去要好。

最后，再添加一个 action 类型来表示当前展示的任务状态。

```
{
  type: SET_VISIBILITY_FILTER,
  filter: SHOW_COMPLETED
}
```

## Action Creators

**Action 创建函数** 就是生成 action 的方法。“action” 和 “action 创建函数” 这两个概念很容易混在一起，使用时最好注意区分。在 [传统的 Flux](http://facebook.github.io/flux) 实现中，当调用 action 创建函数时，一般会触发一个 dispatch，像这样：

```javascript
function addTodoWithDispatch(text) {
  const action = {
    type: ADD_TODO,
    text
  };
  dispatch(action);
}
```

不同的是，Redux 中的 action 创建函数是 **纯函数**，它没有任何副作用，只是返回 action 对象而已。

```javascript
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  };
}
```

这让代码更易于测试和移植。只需把 action 创建函数的结果传给 `dispatch()` 方法即可实例化 dispatch。

```javascript
dispatch(addTodo(text));
dispatch(completeTodo(index));
```

或者创建一个 **被绑定的 action 创建函数** 来自动 dispatch：

```javascript
const boundAddTodo = text => dispatch(addTodo(text));
const boundCompleteTodo = index => dispatch(CompleteTodo(index));
```

然后直接调用它们：

```javascript
boundAddTodo(text);
boundCompleteTodo(index);
```

store 里能直接通过 [`store.dispatch()`](http://camsong.github.io/redux-in-chinese/docs/api/Store.html#dispatch) 调用 `dispatch()` 方法，但是多数情况下你会使用 [react-redux](http://github.com/gaearon/react-redux) 提供的 `connect()` 帮助器来调用。[`bindActionCreators()`](http://camsong.github.io/redux-in-chinese/docs/api/bindActionCreators.html) 可以自动把多个 action 创建函数 绑定到 `dispatch()` 方法上。

* Example

```javascript
/*
 * action 类型
 */

export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * 其它的常量
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action 创建函数
 */

export function addTodo(text) {
  return { type: ADD_TODO, text };
}

export function completeTodo(index) {
  return { type: COMPLETE_TODO, index };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}
```

### [redux-actions](https://github.com/acdlite/redux-actions):Flux Standard Action utilities for Redux

### bindActionCreators:将 ActionCreators 与 dispatch 绑定

把 action creators 转成拥有同名 keys 的对象，但使用 dispatch 把每个 action creator 包围起来，这样可以直接调用它们。一般情况下你可以直接在 Store 实例上调用 dispatch。如果你在 React 中使用 Redux，react-redux 会提供 dispatch 。惟一使用 bindActionCreators 的场景是当你需要把 action creator 往下传到一个组件上，却不想让这个组件觉察到 Redux 的存在，而且不希望把 Redux store 或 dispatch 传给它。为方便起见，你可以传入一个函数作为第一个参数，它会返回一个函数。参数：

* actionCreators (Function or Object): 一个 action creator，或者键值是 action creators 的对象。
* dispatch (Function): 一个 dispatch 函数，由 Store 实例提供。# State

返回值：

* (Function or Object): 一个与原对象类似的对象，只不过这个对象中的的每个函数值都可以直接 dispatch action。如果传入的是一个函数，返回的也是一个函数。

为什么不直接把 action creators 绑定到 store 实例上，就像传统 Flux 那样？问题是这样做的话如果开发同构应用，在服务端渲染时就不行了。多数情况下，你 每个请求都需要一个独立的 store 实例，这样你可以为它们提供不同的数据，但是在定义的时候绑定 action creators，你就可以使用一个唯一的 store 实例来对应所有请求了。

* TodoActionCreators.js

```
export function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text
  };
}

export function removeTodo(id) {
  return {
    type: 'REMOVE_TODO',
    id
  };
}
```

* SomeComponent.js

```
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as TodoActionCreators from './TodoActionCreators';
console.log(TodoActionCreators);
// {
//   addTodo: Function,
//   removeTodo: Function
// }

class TodoListContainer extends Component {
  componentDidMount() {
    // 由 react-redux 注入：
    let { dispatch } = this.props;

    // 注意：这样做行不通：
    // TodoActionCreators.addTodo('Use Redux');

    // 你只是调用了创建 action 的方法。
    // 你必须要 dispatch action 而已。

    // 这样做行得通：
    let action = TodoActionCreators.addTodo('Use Redux');
    dispatch(action);
  }

  render() {
    // 由 react-redux 注入：
    let { todos, dispatch } = this.props;

    // 这是应用 bindActionCreators 比较好的场景：
    // 在子组件里，可以完全不知道 Redux 的存在。

    let boundActionCreators = bindActionCreators(TodoActionCreators, dispatch);
    console.log(boundActionCreators);
    // {
    //   addTodo: Function,
    //   removeTodo: Function
    // }

    return (
      <TodoList todos={todos}
                {...boundActionCreators} />
    );

    // 一种可以替换 bindActionCreators 的做法是直接把 dispatch 函数
    // 和 action creators 当作 props
    // 传递给子组件
    // return <TodoList todos={todos} dispatch={dispatch} />;
  }
}

export default connect(
  state => ({ todos: state.todos })
)(TodoListContainer)
```

> [redux-observable](https://medium.com/@benlesh/redux-observable-ec0b00d2eb52#.qmgez1v8n)

Given that “Redux can be written in a few lines of Rx using the scan operator”, why use Redux at all?
The answer to this is pretty simple: Redux has a well defined existing pattern and guidance for use within React. More importantly, Redux has a lot of nice community-driven tooling that we wanted to be able to take advantage of. At the end of the day, it doesn’t matter if the reducers are run via an Rx `scan` or Redux. What matters is the productivity and performance and Redux and Redux’s tooling provides those two things well

* [can-i-dispatch-multiple-actions-from-redux-action-creators](http://jamesknelson.com/can-i-dispatch-multiple-actions-from-redux-action-creators/)

## MiddleWare Listener Pattern

* [the-middleware-listener-pattern-better-asynchronous-actions-in-redux](https://medium.com/@alexandereardon/the-middleware-listener-pattern-better-asynchronous-actions-in-redux-16164fb6186f#.wy16tsyck)

# Action Utils:Action 的一些辅助工具

> 本部分涉及到了一些 Reducer 相关的知识，初学者可以先浏览 Reducer 章节。

## [redux-actions](https://github.com/acdlite/redux-actions):Flux Standard Action utilities for Redux

redux-actions 是一个辅助快速构建标准的 Flux Action 的工具集，也提供了快速构建 Reducer 的接口。可以使用 npm 进行安装使用：

```
npm install --save redux-actions
import { createAction, handleAction, handleActions } from 'redux-actions';
```

### createAction(type, payloadCreator = Identity, ?metaCreator)

将一个 Action Creator 封装成一个标准的 Flux Action 构造器，如果没有传入任何的 Payload Creator，那么会使用默认的函数，基本的使用例子如下：

```
let increment = createAction('INCREMENT', amount => amount);
// same as
increment = createAction('INCREMENT');

expect(increment(42)).to.deep.equal({
  type: 'INCREMENT',
  payload: 42
});
```

如果传入的 payload 是一个 Error Object，redux-actions 会自动将`action.error`设置为`true`:

```
const increment = createAction('INCREMENT');

const error = new TypeError('not a number');
expect(increment(error)).to.deep.equal({
  type: 'INCREMENT',
  payload: error,
  error: true
});
```

### handleAction(type, reducer | reducerMap, ?defaultState)

handleAction 函数可以将 Reducer 封装为处理标准的 Flux Actions 的函数，如果传入的是单个的 Reducer 的话，那可以用来处理正常的 Actions 与错误的 Actions，用法大概是这个样子的：

```
handleAction('FETCH_DATA', {
  next(state, action) {...}
  throw(state, action) {...}
});
```

第三个参数指向了默认的 state。

### handleActions(reducerMap, ?defaultState)

handleActions 即等效于利用`handleAction`函数创建多个 Reducers 然后组合成一个单独的 Reducer 来处理多个 Actions。与标准的 Redux 中的 Reducer 的写法相比，其优势在于能够以扁平化的方式编写代码：

```javascript
const reducer = handleActions(
  {
    INCREMENT: (state, action) => ({
      counter: state.counter + action.payload
    }),

    DECREMENT: (state, action) => ({
      counter: state.counter - action.payload
    })
  },
  { counter: 0 }
);
```

### reqActionAndReducerCreator

在真实的应用程序开发过程中，最常遇到的问题就是对于数据的请求、获取与更新，而这一套流程涉及到数个 Action 以及对应的状态的改变。

```
import { createAction, handleActions } from "redux-actions";
import update from "react-addons-update";

const REQ_STATE = {
    INIT: "@INIT",
    REQUESTING: "@REQUESTING",
    SUCCESS: "@SUCCESS",
    FAILED: "@FAILED"
}

let reqActionAndReducerCreator = (reqName, fetch, initData) => {
    let request = `${reqName}_REQUEST`,
        success = `${reqName}_SUCCESS`,
        failure = `${reqName}_FAILURE`;

    let actions = {
        [request]: createAction(request),
        [success]: createAction(success),
        [failure]: createAction(failure),
    }

    let reducer = handleActions(
        {
            [request]: (state, action) => (update(state, {
                    state: {$set: REQ_STATE.REQUESTING},
                    time: {$set: new Date()}
                })
            ),
            [success]: (state, action) => (update(state, {
                state: {$set: REQ_STATE.SUCCESS},
                data: {$set: action.payload},
                time: {$set: new Date()}
            })),
            [failure]: (state, action) => (update(state, {
                state: {$set: REQ_STATE.FAILED},
                err: {$set: action.payload},
                time: {$set: new Date()}
            })),
        }, {
            state: REQ_STATE.INIT,
            time: new Date(),
            err: null,
            data: initData || null
        }
    );

    let asyncFetch = (...args) =>  (dispatch) => {
        dispatch(actions[request]());
        try {
            let data = fetch(...args);
            dispatch(actions[success](data));
        } catch (e) {
            dispatch(actions[failure](e));
        }
    };

    return {
        reducer: reducer,
        actions: {
            REQUEST: actions[request],
            SUCCESS: actions[success],
            FAILURE: actions[failure]
        },
        asyncReq: asyncFetch
    }
}

export { REQ_STATE };
export default reqActionAndReducerCreator;
```

# Asynchronous Action & Action Creators

> 本部分以获取 Reddit 的 Posts 为例

异步 action creator 对于做服务端渲染非常方便。你可以创建一个 store，dispatch 一个异步 action creator，这个 action creator 又 dispatch 另一个异步 action creator 来为应用的一整块请求数据，同时在 Promise 完成和结束时才 render 界面。然后在 render 前，store 里就已经存在了需要用的 state。

[Thunk middleware](https://github.com/gaearon/redux-thunk) 并不是 Redux 处理异步 action 的唯一方式。你也可以使用 [redux-promise](https://github.com/acdlite/redux-promise) 或者 [redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware) 来 dispatch Promise 替代函数。你也可以使用 [redux-rx](https://github.com/acdlite/redux-rx) dispatch Observable。你甚至可以写一个自定义的 middleware 来描述 API 请求，就像这个[真实场景的案例](http://camsong.github.io/redux-in-chinese/docs/introduction/Examples.html#real-world)中的做法一样。你也可以先尝试一些不同做法，选择喜欢的，并使用下去，不论有没有使用到 middleware 都行。　当调用异步 API 时，有两个非常关键的时刻：发起请求的时刻，和接收到响应的时刻 (也可能是超时)。这两个时刻都可能会更改应用的 state；为此，你需要 dispatch 普通的同步 action。一般情况下，每个 API 请求都至少需要 dispatch 三个不同的 action：

* **一个通知 reducer 请求开始的 action。**
  　对于这种 action，reducer 可能会切换一下 state 中的 `isFetching` 标记。以此来告诉 UI 来显示进度条。
* **一个通知 reducer 请求成功结束的 action。**
  　对于这种 action，reducer 可能会把接收到的新数据合并到 state 中，并重置 `isFetching`。UI 则会隐藏进度条，并显示接收到的数据。
* **一个通知 reducer 请求失败的 action。**
  　对于这种 action，reducer 可能会重置 `isFetching`。或者，有些 reducer 会保存这些失败信息，并在 UI 里显示出来。

为了区分这三种 action，可能在 action 里添加一个专门的 `status` 字段作为标记位：

```
{ type: 'FETCH_POSTS' }
{ type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
{ type: 'FETCH_POSTS', status: 'success', response: { ... } }
```

又或者为它们定义不同的 type：

```
{ type: 'FETCH_POSTS_REQUEST' }
{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }
```

究竟使用带有标记位的同一个 action，还是多个 action type 呢，完全取决于你。这应该是你的团队共同达成的约定。使用多个 type 会降低犯错误的机率，但是如果你使用像 [redux-actions](https://github.com/acdlite/redux-actions) 这类的辅助库来生成 action creator 和 reducer 的话，这完成就不是问题了。无论使用哪种约定，一定要在整个应用中保持统一。

## Reddit Examples

### Action 定义

actions.js:

```
//用于进行Reddit选择的
export const SELECT_REDDIT = 'SELECT_REDDIT'

export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  }
}
//用于控制刷新按钮进行更新的
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit
  }
}
```

这些是用户操作来控制的 action。也有另外一类 action，是由网络请求来控制。后面会介绍如何使用它们，现在，我们只是来定义它们。当需要获取指定 reddit 的帖子的时候，需要 dispatch `REQUEST_POSTS` action：

```
export const REQUEST_POSTS = 'REQUEST_POSTS'

export function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit
  }
}
```

把 `SELECT_REDDIT` 和 `INVALIDATE_REDDIT` 分开很重要。虽然它们的发生有先后顺序，但随着应用变得复杂，有些用户操作(比如，预加载最流行的 reddit，或者一段时间后自动刷新过期数据)后需要马上请求数据。路由变化时也可能需要请求数据，所以一开始如果把请求数据和特定的 UI 事件耦合到一起是不明智的。最后，当收到请求响应时，我们会 dispatch `RECEIVE_POSTS`：

```
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}
```

# [redux-loop](https://github.com/raisemarketplace/redux-loop):基于 Elm 架构思想的序列化 Effects
