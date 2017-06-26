# Redux 异步处理

在上一节中，我们讨论了Action与Action Creator的基本概念，但是在上文讨论的都是Sync Action Creator，即每个Action Creator都是Pure Function。而我们在实际的应用程序中经常会有一个需求，即是网络请求。网络请求往往附带着延迟，即从触发请求开始到实际获得数据并分发肯定会存在时间间隔，因此，我们在这种情况下需要的不仅仅是同步的Action Creators，还有异步的Action Creator。实际上对于如何实践异步的Action Creator也是见仁见智，笔者在这里会介绍几种常见的用法，各人也可以按照个人的认知与喜好进行选择使用。

本部分介绍的 Thunk, PromiseMiddleware, Sagas 这三种方式本质上都是通过自定义 Redux Middleware 来实现对于异步事件的处理。

## Reference
- [how-to-dispatch-a-redux-action-with-a-timeout](http://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559)

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
上文我们一再强调，redux-thunk 本身也是基于 Middleware 的实现，我们自然也可以实现自己的中间件来根据不同的 Action 进行不同的延时响应，这部分就是我们下一节介绍的内容。

# PromiseMiddle

# Sagas
