[![返回目录](https://parg.co/US3)](https://parg.co/UGZ)

# Reducer

```js
const appReducer = combineReducers({
  todos,
  visibilityFilter
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

const store = createStore(rootReducer);
```

[Action](http://camsong.github.io/redux-in-chinese/docs/basics/Actions.html) 只是描述了**有事情发生了**这一事实，并没有指明应用如何更新 state。而这正是 reducer 要做的事情。一个基本的 Reducer 如下所示：

```js
/**
 * Reducer
 *
 * @param State
 * @param Action
 *
 * @return new State
 */
let reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [createItem(action.text), ...state];

    default:
      return state;
  }
};
```

## State 结构设计

    Redux中，State的结构由createStore中输入的第一个参数reducer决定，如果reducer是一个Func，那么state直接就是该reducer的默认参数，如果是{
    todos:Func

}
这种形式，那么 state 的结构就是：

```
{
    todos:[]
}
```

在 Redux 应用中，所有的 state 都被保存在一个单一对象中。建议在写代码前先想一下这个对象的结构。注意，在 reducer 中接收的 state 参数，并不是一个完整的 state，而是以该 reducer 为键名的值。以 todo 应用为例，需要保存两个不同的内容：

* 当前选中的任务过滤条件。
* 真实的任务列表。

通常，这个 state 树还需要存放其它一些数据，例如 UI 相关的 state。这样做没问题，但尽量把这些数据与 UI 相关的 state 分开。不过笔者觉得，与 UI 相关的临时性状态，还是可以放到组件内部处理的。

```javascript
{
  visibilityFilter: 'SHOW_ALL',
  todos: [{
    text: 'Consider using Redux',
    completed: true,
  }, {
    text: 'Keep all state in a single tree',
    completed: false
  }]
}
```

开发复杂的应用时，不可避免会有一些数据相互引用。建议你尽可能地把 state 范式化，不存在嵌套。把所有数据放到一个对象里，每个数据以 ID 为主键，不同数据相互引用时通过 ID 来查找。把应用的 state 想像成数据库。这种方法在 [normalizr](https://github.com/gaearon/normalizr) 文档里有详细阐述。例如，实际开发中，在 state 里同时存放 `todosById: { id -> todo }` 和 `todos: array` 是比较好的方式，本文中为了保持示例简单没有这样处理。

## Action 处理

现在我们已经确定了 state 对象的结构，就可以开始开发 reducer。reducer 就是一个函数，接收旧的 state 和 action，返回新的 state。

```
(previousState, action) => newState
```

之所以称作 reducer 是因为和 [`Array.prototype.reduce(reducer, ?initialValue)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 格式很像。保持 reducer 纯净非常重要。**永远不要**在 reducer 里做这些操作：

* 修改传入参数；
* 执行有副作用的操作，如 API 请求和路由跳转。

在[高级篇](http://camsong.github.io/redux-in-chinese/docs/advanced/index.html)里会介绍如何执行有副作用的操作。现在只需要谨记 reducer 一定要保持纯净。**只要传入参数一样，返回必须一样。没有特殊情况、没有副作用，没有 API 请求、没有修改参数，单纯执行计算。**明白了这些之后，就可以开始编写 reducer，并让它来处理之前定义过的 [actions](http://camsong.github.io/redux-in-chinese/docs/basics/Actions.html)。我们在开始时定义默认的 state。Redux 首次执行时，state 为 `undefined`，这时候会返回默认 state。

```javascript
import { VisibilityFilters } from './actions';

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
};

function todoApp(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }

  // 这里暂不处理任何 action，
  // 仅返回传入的 state。
  return state;
}
```

这里一个技巧是使用 [ES6 参数默认值语法](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/default_parameters) 来精简代码。

```javascript
function todoApp(state = initialState, action) {
  // 这里暂不处理任何 action，
  // 仅返回传入的 state。
  return state;
}
```

## State Handler:创建新的 State

在 Reducer 中进行 State 处理时，要注意，不能修改 state，而是要返回一个新的 state。使用 [`Object.assign()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 新建了一个副本。不能这样使用 `Object.assign(state, { visibilityFilter: action.filter })`，因为它会改变第一个参数的值。你**必须**把第一个参数设置为空对象。也可以使用 ES7 中还在试验阶段的特性 `{ ...state, ...newState }`，参考 [对象展开语法](https://github.com/sebmarkbage/ecmascript-rest-spread)。另外**在 default 情况下返回旧的 state。**遇到未知的 action 时，一定要返回旧的 `state`。

### Object.assign

处理 `SET_VISIBILITY_FILTER`。需要做的只是改变 state 中的 `visibilityFilter`。

```javascript
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      });
    default:
      return state;
  }
}
```

...扩展操作符

```
case COMPLETE_TODO:
  return Object.assign({}, state, {
    todos: [
      ...state.todos.slice(0, action.index),
      Object.assign({}, state.todos[action.index], {
        completed: true
      }),
      ...state.todos.slice(action.index + 1)
    ]
  });
```

### React Immutability Helpers

React 官方库在其 Addons 中提供了一个便携式的 Immutable 辅助库，算是 ImmutableJS 的简化版，笔者自己比较喜欢用这种方式进行状态的更新，相较于`Object.assign`会优雅很多，而相较于 ImmutableJS 又不需要引入额外的依赖库。基本用法如下所示：

```
var update = require('react-addons-update');
var newData = update(myData, {
  x: {y: {z: {$set: 7}}},
  a: {b: {$push: [9]}}
});
```

其中以`$`为前缀的键被称为命令，而可变的数据称为目标，常用的几个命令为：

* `{$push: array}`: 将 `array`中的元素添加到目标尾。
* `{$unshift: array}`:从目标数组中移除所有在`array`中的元素。
* `{$splice: array of arrays}` for each item in `arrays` call `splice()` on the target with the parameters provided by the item.
* `{$set: any}` : 替换整个目标
* `{$merge: object}`:根据键值将目标与`object`合并
* `{$apply: function}` :输入当前值，并且根据新的值进行更新

#### 简单的插入

```
var initialArray = [1, 2, 3];
var newArray = update(initialArray, {$push: [4]}); // => [1, 2, 3, 4]
```

注意，`initialArray`仍然是`[1,2,3]`。

#### 嵌套集合

```
var collection = [1, 2, {a: [12, 17, 15]}];
var newCollection = update(collection, {2: {a: {$splice: [[1, 1, 13, 14]]}}});
// => [1, 2, {a: [12, 13, 14, 15]}]
```

根据下标`2`访问集合，然后根据键`a`访问数组，然后从下标 1 开始拼接新数组，并且插入新的 13，14。

#### 根据现有的值更新数据

```
var obj = {a: 5, b: 3};
var newObj = update(obj, {b: {$apply: function(x) {return x * 2;}}});
// => {a: 5, b: 6}
// This is equivalent, but gets verbose for deeply nested collections:
var newObj2 = update(obj, {b: {$set: obj.b * 2}});
```

#### 合并

```
var obj = {a: 5, b: 3};
var newObj = update(obj, {$merge: {b: 6, c: 7}}); // => {a: 5, b: 6, c: 7}
```

### ImmutableJS

### 处理多个 Action

在 TodoApp 中存在有两个 Action 需要处理，让我们先处理 `ADD_TODO`。

```
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      });
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [...state.todos, {
          text: action.text,
          completed: false
        }]
      });
    default:
      return state;
  }
}
```

如上，不直接修改 `state` 中的字段，而是返回新对象。新的 `todos` 对象就相当于旧的 `todos` 在末尾加上新建的 todo。而这个新的 todo 又是基于 action 中的数据创建的。最后，`COMPLETE_TODO` 的实现也很好理解：

```
case COMPLETE_TODO:
  return Object.assign({}, state, {
    todos: [
      ...state.todos.slice(0, action.index),
      Object.assign({}, state.todos[action.index], {
        completed: true
      }),
      ...state.todos.slice(action.index + 1)
    ]
  });
```

因为我们不能直接修改却要更新数组中指定的一项数据，这里需要先把前面和后面都切开。如果经常需要这类的操作，可以选择使用帮助类 [React.addons.update](https://facebook.github.io/react/docs/update.html)，[updeep](https://github.com/substantial/updeep)，或者使用原生支持深度更新的库 [Immutable](http://facebook.github.io/immutable-js/)。最后，时刻谨记永远不要在克隆 `state` 前修改它。

## Reducer 组织

### Reducer 拆分

目前的代码看起来有些冗余：

```
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      });
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [...state.todos, {
          text: action.text,
          completed: false
        }]
      });
    case COMPLETE_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos.slice(0, action.index),
          Object.assign({}, state.todos[action.index], {
            completed: true
          }),
          ...state.todos.slice(action.index + 1)
        ]
      });
    default:
      return state;
  }
}
```

上面代码能否变得更通俗易懂？这里的 `todos` 和 `visibilityFilter` 的更新看起来是相互独立的。有时 state 中的字段是相互依赖的，需要认真考虑，但在这个案例中我们可以把 `todos` 更新的业务逻辑拆分到一个单独的函数里：

```
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, {
        text: action.text,
        completed: false
      }];
    case COMPLETE_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true
        }),
        ...state.slice(action.index + 1)
      ];
    default:
      return state;
  }
}

function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      });
    case ADD_TODO:
    case COMPLETE_TODO:
      return Object.assign({}, state, {
        todos: todos(state.todos, action)
      });
    default:
      return state;
  }
}
```

注意 `todos` 依旧接收 `state`，但它变成了一个数组！现在 `todoApp` 只把需要更新的一部分 state 传给 `todos` 函数，`todos` 函数自己确定如何更新这部分数据。**这就是所谓的 reducer 合成，它是开发 Redux 应用最基础的模式。**

### Reducer 合并

下面深入探讨一下如何做 reducer 合成。能否抽出一个 reducer 来专门管理 `visibilityFilter`？当然可以：

```
function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}
```

现在我们可以开发一个函数来做为主 reducer，它调用多个子 reducer 分别处理 state 中的一部分数据，然后再把这些数据合成一个大的单一对象。主 reducer 并不需要设置初始化时完整的 state。初始时，如果给子 reducer 传入 `undefined` 只要返回它们的默认值即可。

```
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, {
        text: action.text,
        completed: false
      }];
    case COMPLETE_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true
        }),
        ...state.slice(action.index + 1)
      ];
    default:
      return state;
  }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  };
}
```

**注意每个 reducer 只负责管理全局 state 中它负责的一部分。每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据。**

现在看过起来好多了！随着应用的膨胀，我们已经学会把 reducer 拆分成独立文件来分别处理不同的数据域了。

最后，Redux 提供了 [`combineReducers()`](http://camsong.github.io/redux-in-chinese/docs/api/combineReducers.html) 工具类来做上面 `todoApp` 做的事情，这样就能消灭一些样板代码了。有了它，可以这样重构 `todoApp`：

```
import { combineReducers } from 'redux';

const todoApp = combineReducers({
  visibilityFilter,
  todos
});

export default todoApp;
```

注意上面的写法和下面完全等价：

```
export default function todoApp(state, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  };
}
```

你也可以给它们设置不同的 key，或者调用不同的函数。下面两种合成 reducer 方法完全等价：

```
const reducer = combineReducers({
  a: doSomethingWithA,
  b: processB,
  c: c
});

function reducer(state, action) {
  return {
    a: doSomethingWithA(state.a, action),
    b: processB(state.b, action),
    c: c(state.c, action)
  };
}
```

[`combineReducers()`](http://camsong.github.io/redux-in-chinese/docs/api/combineReducers.html) 所做的只是生成一个函数，这个函数来调用你的一系列 reducer，每个 reducer **根据它们的 key 来筛选出 state 中的一部分数据并处理**，然后这个生成的函数所所有 reducer 的结果合并成一个大的对象。[没有任何特殊用法。](https://github.com/gaearon/redux/issues/428#issuecomment-129223274)

```
rootReducer = combineReducers({
  router, // redux-react-router reducer
    account: combineReducers({
      profile: combineReducers({
         info, // reducer function
         credentials // reducer function
      }),
      billing // reducer function
    }),
    // ... other combineReducers
  })
});
```

### Reducer 导入

`combineReducers` 接收一个对象，可以把所有顶级的 reducer 放到一个独立的文件中，通过 `export` 暴露出每个 reducer 函数，然后使用 `import * as reducers` 得到一个以它们名字作为 key 的 object：

```
 import { combineReducers } from 'redux';
 import * as reducers from './reducers';

 const todoApp = combineReducers(reducers);
```

```
import * as reducers1 from './reducer1';
import * as reducers2 from './reducer2';

const allReducers = Object.assign({}, reducers1, reducers2);
const reducer = combineReducers(allReducers);
```

# Store

**Store** 就是把它们联系到一起的对象。Store 有以下职责：

* 维持应用的 state；
* 提供 [`getState()`](http://camsong.github.io/redux-in-chinese/docs/api/Store.html#getState) 方法获取 state；
* 提供 [`dispatch(action)`](http://camsong.github.io/redux-in-chinese/docs/api/Store.html#dispatch) 方法更新 state；
* 通过 [`subscribe(listener)`](http://camsong.github.io/redux-in-chinese/docs/api/Store.html#subscribe) 注册监听器。

再次强调一下 **Redux 应用只有一个单一的 store**。当需要拆分处理数据的逻辑时，使用 [reducer 组合](http://camsong.github.io/redux-in-chinese/docs/basics/Reducers.html#splitting-reducers) 而不是创建多个 store。

## Store 创建

根据已有的 reducer 来创建 store 是非常容易的。在[前一个章节](http://camsong.github.io/redux-in-chinese/docs/basics/Reducers.html)中，我们使用 [`combineReducers()`](http://camsong.github.io/redux-in-chinese/docs/api/combineReducers.html) 将多个 reducer 合并成为一个。现在我们将其导入，并传递 [`createStore()`](http://camsong.github.io/redux-in-chinese/docs/api/createStore.html)。

```
import { createStore } from 'redux'
import todoApp from './reducers'
let store = createStore(todoApp)
```

[`createStore()`](http://camsong.github.io/redux-in-chinese/docs/api/createStore.html) 的第二个参数可以设置初始状态。这对开发同构应用时非常有用，可以用于把服务器端生成的 state 转变后在浏览器端传给应用。

```
let store = createStore(todoApp, window.STATE_FROM_SERVER);
```

## Dispatch Actions

现在我们已经创建好了 store ，让我们来验证一下！虽然还没有界面，我们已经可以测试更新逻辑了。

```
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from './actions';

// 打印初始状态
console.log(store.getState());

// 监听 state 更新时，打印日志
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

// 发起一系列 action
store.dispatch(addTodo('Learn about actions'));
store.dispatch(addTodo('Learn about reducers'));
store.dispatch(addTodo('Learn about store'));
store.dispatch(completeTodo(0));
store.dispatch(completeTodo(1));
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

// 停止监听 state 更新
unsubscribe();
```

可以看到 store 里的 state 是如何变化的：

![](http://i.imgur.com/zMMtoMz.png)

可以看到，在还没有开发界面的时候，我们就可以定义程序的行为。而且这时候已经可以写 reducer 和 action 创建函数的测试。不需要模拟任何东西，因为它们都是纯函数。只需调用一下，对返回值做断言，写测试就是这么简单。
