[![返回目录](https://parg.co/US3)](https://parg.co/UGZ)

记得我才开始使用 React 的时候，还没有 Redux 呢，那时候只有 Flux 架构的理论概念和一堆各种各样的实现。而硝烟之后，现在主流的状态与数据管理框架便数 Redux 与 MobX，其中 MobX 并非 Flux 的实现。Redux 如此流行的一个重要乃其广泛的适用性，其不仅适用于 React，还能应用于包括 Angular 2 在内的众多前端框架中。而 MobX 与 Redux 相比，我会更倾向于在简单的 UI 工程中使用它，换言之，我认为 MobX 并没有提供很多 Redux 拥有的特性。因此根据你的项目特质来选择合适的状态管理框架才是正道。另外，Relay 与 Falcor 也是很流行的可以用于状态管理的工具，不过不同于 Redux 或者 MobX，它们对于后端有特定的需求，只能基于 GraphQL 或者 Falcor Server，并且 Relay 中的状态也与服务端持久化存储的某些数据相匹配。换言之，Relay 与 Falcor 并没有提供了可以独立运行在客户端并且支持暂时态的状态管理功能，不过如果你需要同时维护 Client-Only 与 Server-Persisted 的状态，那么混用 Redux 与 Relay 也是个不错的选择。没有最好的工具，只有最合适的工具。
Redux 的作者 Dan Abramov 提供了不少的优质学习资源，譬如[Getting Started with Redux](https://egghead.io/courses/getting-started-with-redux)与[building-react-applications-with-idiomatic-redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux)，这二者都可以引领你一步一步地熟悉并且掌握 Redux 基础，而本文则是从工程实践经验的角度来介绍一些高级的技巧让你能够更好地使用 Redux。

# Understand the Benefits of Redux:认识 Redux

Redux 最重要的两个特性可以概括为：

* Deterministic View Renders：可确定/可控的视图渲染
* Deterministic State Reproduction：可确定/可控的状态重现
  Determinism 对于保证应用的可测试性与诊断调试以及 Bug 修复非常重要。如果你的应用视图与状态是非 Deterministic，也就意味着你无法了解到视图与状态是否是有效的，乃至于非 Deterministic 本身就是一个 Bug。不过很多东西本质上就是不可确定的，譬如用户何时产生输入操作以及网络 I/O 的变化等等。而在这种情况下我们又该如何保证代码的工作正常呢？那就要从代码隔离下手了。
  Redux 最主要的目标即是在界面渲染或者通过网络获取数据时将状态管理隔离于譬如 I/O 这样的副作用。在隔离了副作用之后，代码会变得清晰很多，也能更加方便地审阅与测试你的独立于界面操作与网络请求的业务逻辑代码。当你的 View Render 独立于网络 I/O，也就意味着此时的 View Render 是可确定的 View Render，即在有相同的状态输入的情况下永远会获得相同的结果。很多新手在考虑如何创建视图的时候，会参考一下步骤：这部分需要一个 User Model，这样我才能在 Model 中发起异步请求然后通过 Promise 来根据名字更新 User Component。另一块需要 TODO Items，在获取完毕之后遍历整个数组然后渲染到屏幕上。不过这种模式会存在以下的缺陷：
* 在任意的时间点你并不会拥有用于渲染整个界面的全部数据，很多时候直到组件开始某些操作之前并不会开始数据抓取过程。
* 不同的数据获取可能会在不同的时间点结束，从而会改变 View Render 序列的渲染顺序。为了能真实了解渲染的顺序，你必须要知道些无法控制的东西：每个异步请求的完成间隔。就譬如在上述描述的场景中，你并不知道 User 数据与 TODO 数据哪个会先被获得，就好像薛定谔的猫，谁也不知道会是什么结果。
* 有时候事件监听器也会修改视图状态，这样也会触发另一轮的渲染，如此递归，从而使得渲染序列变得更加不可知。直接将数据存储在视图状态中并且允许异步的事件监听器去修改这些视图状态最大的问题在于将数据获取、数据处理与视图渲染混合在一起，就好比做一盘乱麻般的意大利面条：

```
Nondeterminism = Parallel Processing + Shared State
```

而 Flux 框架所做的就是严格的隔离规范与顺序操作保证这样一种可控性：

* 首先，某个时刻我们都有已知并且固定的状态
* 然后，根据该状态进行视图渲染，在视图渲染的过程中并不会受到任何异步监听器的影响，并且保证在相同的状态下会渲染出相同的视图
* Event Listeners 负责监听用户输入或者网络请求，在接受到异步的触发之后，会将 Actions 投递到 Dispatcher
* 在某个 Action 分发之后，状态会根据 Action 更新到下个已知的状态，仅有通过分发的 Action 才能修改全局状态
  ![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/8/2/1-2FrT8oMXswVWiVEfBCXlAQ.png)
  在上述的 Flux 架构中，视图负责监听用户输入并且将之转化为 Action 对象，然后 Action 对象会被投递到 Store 中。Store 在接收到 Action 之后会根据不同的 Action 类型与载荷数据更新应用状态，然后通知 View 进行重渲染。当然，View 并非唯一的输入与事件触发源，不过我们也可以通过设置其他的事件监听器来派发其他的 Action 对象，如下所示：
  ![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/8/2/1-MdaK2tzd5f9BqadwMvPoKg.png)
  另外需要注意的是，Flux 中的状态更新是事务性的，不同于简单的调用状态更新函数或者直接操作对象值，任何一个 Action 对象都是事务记录。可以把它类比于银行中的交易，当你存入一笔钱到你的账户时，并不会覆盖清除你 5 分钟之前的交易记录，而会将新的结算信息添加到事务的历史记录中。一个 Action 对象如下所示：

```
{
  type: ADD_TODO,
  payload: 'Learn Redux'
}
```

Action 对象允许我们将所有对于对象的操作全部记录下来，而这些记录可以通过可控的方式进行状态重现，也就是说，在相同的初始状态下只要将相同的事务以相同的顺序进行执行，就能够得到相同的状态结果。总结一下，在这样一种可控的状态管理中，我们能够方便地达成以下目标：

* 易测试性
* 方便地 Undo/Redo
* Time Travel Debugging
* 可重现性：即使某个状态已经被清除了，但是只要你保留有事务处理的历史记录，你就可以重现该状态
  ![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/8/2/1-KFJdTQCHH60QDDWTJobVRw.gif)

# Some Apps Don't Need Redux:并不一定要用 Redux

如果你的 UI 工作流程本身便不复杂，那么还坚持要用 Redux 就有点大材小用，过度使用了。譬如你打算弄一个剪刀锤子布的小游戏，你觉得你需要 Undo/Redo 功能吗？这种游戏每局差不多一分钟左右吧，即使用户把游戏弄崩溃了，也只要简单的重启游戏即可。当你打算启动一个新项目时，你可以考量以下几点来判断是否需要 Redux:

* 用户工作流比较简单
* 用户之间并不会有所协作交互
* 并不需要关心 Server Side Events 或者 WebSockets
* 对于每个 View 而言只需要从单一的数据源抓取数据这种时候你并不需要花费额外的精力来维持可控的可重现的状态，这时候你就可以尝试使用[MobX](https://github.com/mobxjs/mobx)。不过，随着你的应用的功能增加，复杂度的增加，事务型的状态就有所必要了，而 MobX 并没有提供这种事务型的状态管理：
* 用户工作流比较复杂
* 应用中可能包含很多不同性质的工作流，譬如有普通用户与管理员之分
* 用户之间会发生交互
* 使用 WebSockets 或者 SSE
* 对于单一视图也需要从多个 EndPoint 抓取数据这时候你再引入事务型状态管理模型那就棋逢对手，物有所值了。为啥说 WebSockets 与 SSE 状态下建议引入 Transactional State 呢？随着你不断地增加异步 I/O 源，你会越来越难以在模糊的状态管理中理解到底会发生啥。在我个人的理解中，大部分的 SAAS 产品的 UI 工作流都挺复杂的，那么此时使用类似于 Redux 这样的事务型状态管理解决方案能够增加应用的健壮性与可扩展性。
  # Understand Reducers: Redux = Flux + Functional Programming
  Flux 规定了单向的数据流规范与基于 Action 对象的事务型状态管理，不过 Flux 并没有指明应该如何处理 Action 对象，这也是 Redux 独有的特点之一。当我们初学 Redux 状态管理时，不可避免地会接触到 Reducer 的概念，那么何谓 Reducer 函数呢？在函数式编程中，常见的两个辅助函数`reducer()`与`fold()`常常被用于将列表中的某个值转化为某个单一的输出值。这里就给出了一个基于`Array.prototype.reduce()`函数的求和 Reducer 的例子：

```
const initialState = 0;
const reducer = (state = initialState, data) => state + data;
const total = [0, 1, 2, 3].reduce(reducer);
console.log(total); // 6
```

不同于面向某个数组进行操作，Redux 提供的 Reducer 函数主要是面向 Action 对象流进行操作，我们上文中有提到 Action 对象大概是这样的:

```
{
  type: ADD_TODO,
  payload: 'Learn Redux'
}
```

我们可以将上述的求和 Reducer 转化为如下的 Redux 风格的 Reducer:

```
const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD': return state + action.payload;
    default: return state;
  }
};
```

然后我们就可以使用一系列的 Action 对象进行测试了:

```
const actions = [
  { type: 'ADD', payload: 0 },
  { type: 'ADD', payload: 1 },
  { type: 'ADD', payload: 2 }
];
const total = actions.reduce(reducer, 0); // 3
```

# Reducers Must be Pure Functions:生而纯函数的 Reducer

为了能保证可控的状态重现，Reducers 必须保证为纯函数，即毫无副作用。所谓纯函数，会有如下特性：

* 相同的输入会有相同的输出
* 并没有任何的副作用需要注意的是，在 JavaScript 中，所有的传入函数中的非原始类型都会以引用形式传递，换言之，如果你传入了某个 Object 对象，然后在函数中直接改变了其属性值，那么函数外的该 Object 对象属性值也会发生变化。这也就是所谓的副作用，如果你不知道某个传入函数中的对象的全部操作记录你也就无法知道该函数的真实返回值。这也就导致了整个函数的不可控性与不确定性。
  Reducers 应该返回某个新的 Object 对象，譬如使用`Object.assign({}, state, { thingToChange })`来修改并且获得某个对象值。而对于所有的 Array 参数，它们同样是引用类型传入的，你不能直接使用`push()`、`pop()`、`.shift()`、`unshift()`、`reverse()`、`splice()`或者类似的操作来修改传入的数组。我们应该使用`concat()`函数来代替`push()`进行操作，譬如我们需要添加某个 Reducer 来处理`ADD_CHAT`事件:

```
const ADD_CHAT = 'CHAT::ADD_CHAT';

const defaultState = {
  chatLog: [],
  currentChat: {
    id: 0,
    msg: '',
    user: 'Anonymous',
    timeStamp: 1472322852680
  }
};

const chatReducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CHAT:
      return Object.assign({}, state, {
        chatLog: state.chatLog.concat(payload)
      });
    default: return state;
  }
};
```

如你所见，我们可以使用`Object.assign()`或者 Array 中的`concat()`函数来创建新的对象。如果你希望在 JavaScript 中如何使用纯函数，那么可以参考[master-the-javascript-interview-what-is-a-pure-function](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976#.26ljw27tp)这篇文章。

# Reducer Must be the Single Source of Truth:单一的状态存储

何谓 Single Source of Truth？即应用中的所有状态都存放在单一的存储中，任何需要访问状态的地方都需要通过该存储的引用进行访问。当然，对于不同的业务逻辑/不同的事物可以设置不同的状态源，譬如 URL 可以认为是用户输入与请求参数的 Single Source of Truth。而应用中存在某个 Configuration Service 用于存放所有的 API URLs 信息。而如果你选用 Redux 作为状态管理框架，任何对于状态的访问操作都必须通过 Redux。换言之，如果你没有使用单一的状态存储源，你可能会失去如下的特性：

* 可确定的/可控的视图渲染
* 可确定的/可控的状态重现
* 方便的 Undo/Redo
* Time Travel Debugging
* 易测性

# Use Constants for Action Types:使用常量描述 Action 类型

我们希望 Action 历史记录中的 Action 易于追踪易于理解，如果所有的 Action 都是设置了较短的、通用性的譬如`CHANGE_MESSAGE`这样的名字，也就会难以理解 APP 中到底发生了啥。而如果 Action 类型能有更具说明性的命名，譬如:`CHAT::CHANGE_MESSAGE`，可以让我们在调试的时候更方便地去理解到底发生了啥。因此，我们建议将所有在 Reducer 中用到的 Action 声明归结到一个文件中(文中建议是放置到 Reducer 文件的首部)，并且在文件头部显式声明该类型，这会有助于你：

* 保证命名的一致性
* 快速理解 Reducer API 功能
* 发现 Pull Request 中所做的修改

# 使用 Action Creators 来将 Action 逻辑与 Dispatch 调用解耦合

有时候，当我跟别人说你并不能在 Reducer 中进行类似于 ID 生成或者获取当前时间等操作时，很多人以一种关怀智障的表情看着我。不过平心而论，最合适的来处理有副作用的逻辑而不是在每次需要构建该 Action 的时候就写一遍代码的地方当属 Action Creator。Action Creator 的优点可列举如下：

* 不需要在很多地方导入声明在 Reducer 文件中的 Action 类型常量
* 在实际的分发 Action 之前可以进行些简单的计算或者输入转换
* 减少模板代码的数量

这里我们尝试使用 Action Creator 来创建`ADD_CHAT`Action 对象：

```
// Action creators can be impure.
export const addChat = ({
  // cuid is safer than random uuids/v4 GUIDs
  // see usecuid.org
  id = cuid(),
  msg = '',
  user = 'Anonymous',
  timeStamp = Date.now()
} = {}) => ({
  type: ADD_CHAT,
  payload: { id, msg, user, timeStamp }
});
```

这里我们使用[cuid](https://github.com/ericelliott/cuid)来为每条聊天记录构建标识，使用`Date.now()`来生成时间戳。这些带有副作用的操作是绝对不能运行在 Reducer 中的，否则就会破坏 Reducer 的事务型状态管理的特性。

## Reduce Boilerplate with Action Creators

有些人可能会认为使用 Action Creator 会增加项目中的代码的数量，不过作者认为恰恰相反的是，通过引入 Action Creator 可以方便地减少 Reducer 中的代码的数量。譬如我们需要添加两个功能，允许用户自定义它们的用户名与在线状态，那么我们可能需要添加两个 Action Type 到 Reducer 中：

```
const chatReducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CHAT:
      return Object.assign({}, state, {
        chatLog: state.chatLog.concat(payload)
      });
    case CHANGE_STATUS:
      return Object.assign({}, state, {
        statusMessage: payload
      });
    case CHANGE_USERNAME:
      return Object.assign({}, state, {
        userName: payload
      });
    default: return state;
  }
};
```

对于一个需要处理复杂逻辑的 Reducer，这些细微的功能需求可能使其迅速变得庞杂。而作者在日常的工作中会构建很多比这个更加复杂的 Reducer，里面充斥着大量重复冗余的代码。而我们又该如何简化这些代码呢？我们可以尝试将所有对于简单状态的改变合并到单个 Action 中完成：

```
const chatReducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CHAT:
      return Object.assign({}, state, {
        chatLog: state.chatLog.concat(payload)
      });

    // Catch all simple changes
    case CHANGE_STATUS:
    case CHANGE_USERNAME:
      return Object.assign({}, state, payload);

    default: return state;
  }
};
```

尽管我们需要添加额外的注释，这种样子实现也会比原来两个单独的 Case 处理要减少很多的代码。另外我们会关注到在 Reducer 文件中经常出现的关键字：switch，可能你在[其他文章](http://pjabook.com/)中有看到过，应该避免使用`switch`语句，特别是需要避免对于落空状态的依赖与处理，否则会让整个 Case 的处理变得异常肿胀。不过作者认为：

* Reducers 的一个重要特性就是可组合性，因此我们完全可以通过组合 Reducer 来避免过于肿胀的 Case 处理出现。当你觉得某个 Case 列表太长的时候，将其切分到不同的 Reducer 中即可。
* 保证每个 Case 处理的最后都添加一个返回语句，这样就不会陷入未命中的情况了。

最后，与上面 Reducer 相匹配的 Action Creator，应该遵循如下写法：

```
export const changeStatus = (statusMessage = 'Online') => ({
  type: CHANGE_STATUS,
  payload: { statusMessage }
});

export const changeUserName = (userName = 'Anonymous') => ({
  type: CHANGE_USERNAME,
  payload: { userName }
});
```

如代码所示，Action Creator 不再仅仅单纯地构造出某个 Action 对象，还将传入的参数转化为了 Reducer 中所需要的形式，从而简化了 Reducer 中的代码。

# 使用 ES6 默认函数值来做函数签名

如果你使用譬如 Sublime Text 或者 Atom 这样流行的编辑器，它会自动地读取 ES6 的默认解构值并且帮你在调用某个 Action Creator 时推导出必须的参数有哪些，这样你就能方便地使用智能提示与自动完成功能了。这一特性能够简化开发者额外的认知压力，他们不用再烦恼于因为总是记不住 Payload 的形式而不得不经常翻阅源代码了。所以这里推荐你可以使用类似于 Tern、TypeScript 或者 Flow 这样的类型推导插件或者强类型语言。不过笔者是更推荐使用 ES6 在解构赋值中提供的默认解构值的特性作为函数签名，而不是使用类型注解，原因如下：

* 这样就可以只学习标准的 JavaScript 而不需要再去学习 Flow 或者 TypeScript 这样的 JavaScript 超集
* 越少的语法能保证越好的可读性
* 使用默认值有助于在 CI 时避免类型错误，也能在运行时避免触发大量的`undefined`参数赋值

# 使用 Selectors 来进行状态统计与解耦合

假如你已经构建好了一个数万行代码的复杂的聊天 APP 应用，然后亲爱的产品经理跟你说需要添加一个新的 Exciting 特性进去，而不得不要修改你现有的状态树中的数据结构。不方，这里介绍的 Selector 即是一种有效地将状态树的结构与应用的其他部分解耦和的工具。

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/8/2/1-xRYkPbfOQTOSaFpUxJRGeA.gif)

基本上对于我写的每个 Reducer，我都会创建一个对应的 Selector 来将所有需要用于构建 View 的变量导出，对于简单的 Chat Reducer，可能要如下所写：

```
export const getViewState = state => Object.assign({}, state, {
  // return a list of users active during this session
  recentlyActiveUsers: [...new Set(state.chatLog.map(chat => chat.user))]
});
```

如果你将需要对状态所做的简单的计算放置到 Selector 中，你可以得到如下的遍历：

* 遵循了职责分割的原则，减少了 Reducer 与 Components 的复杂度
* 将应用的其他部分与状态结构解耦和

# 使用 TDD，优先编写测试用例

[很多的研究](https://www.computer.org/csdl/mags/so/2007/03/s3024.pdf)都有专门对比过 Test-First、Test-After 以及 No-Test 这三个不同的开发模式，结果都是相似的：大部分研究都表明在开发之前先编写测试用例能够减少 40-80%Bug 出现的比率。即使在编写本文中所有的例子之前，我都会先写好对应的测试用例。为了避免过于简单的测试用例，我编写了如下的工厂方法来产生预测值：

```
const createChat = ({
  id = 0,
  msg = '',
  user = 'Anonymous',
  timeStamp = 1472322852680
} = {}) => ({
  id, msg, user, timeStamp
});

const createState = ({
  userName = 'Anonymous',
  chatLog = [],
  statusMessage = 'Online',
  currentChat = createChat()
} = {}) => ({
  userName, chatLog, statusMessage, currentChat
});
```

注意，这两个工厂方法中我都提供了默认值，也就保证了我在编写测试用例时仅需要将我感兴趣的参数传入，其他的参数使用默认值即可。

```
describe('chatReducer()', ({ test }) => {
  test('with no arguments', ({ same, end }) => {
    const msg = 'should return correct default state';

    const actual = reducer();
    const expected = createState();

    same(actual, expected, msg);
    end();
  });
});
```

这里我是使用[Tape](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4#.711m3iv2m)作为默认的 TestRunner，之前我也有 2~3 年的时间在使用 Mocha 与 Jasmine，还有很多其他的框架。你应该能够注意到我倾向于使用嵌套的测试用例编写方式，可能是受之前使用 Mocha 与 Jasmine 较多的影响，我习惯先在外层声明某个测试组件，然后在内层声明组件的传入参数。这里我分别给出对于 Action Creator、Selector 的测试用例。

## Action Creator Tests

```
describe('addChat()', ({ test }) => {
  test('with no arguments', ({ same, end}) => {
    const msg = 'should add default chat message';

    const actual = pipe(
      () => reducer(undefined, addChat()),
      // make sure the id and timestamp are there,
      // but we don't care about the values
      state => {
        const chat = state.chatLog[0];
        chat.id = !!chat.id;
        chat.timeStamp = !!chat.timeStamp;
        return state;
      }
    )();

    const expected = Object.assign(createState(), {
      chatLog: [{
        id: true,
        user: 'Anonymous',
        msg: '',
        timeStamp: true
      }]
    });

    same(actual, expected, msg);
    end();
  });


  test('with all arguments', ({ same, end}) => {
    const msg = 'should add correct chat message';

    const actual = reducer(undefined, addChat({
      id: 1,
      user: '@JS_Cheerleader',
      msg: 'Yay!',
      timeStamp: 1472322852682
    }));
    const expected = Object.assign(createState(), {
      chatLog: [{
        id: 1,
        user: '@JS_Cheerleader',
        msg: 'Yay!',
        timeStamp: 1472322852682
      }]
    });

    same(actual, expected, msg);
    end();
  });
});
```

这个例子有个很有趣的地方在于，`addChat()`Action Creator 本身非纯函数。也就是说除非你传入特定的值进行覆盖，否则你并不能预测它到底会生成怎样的属性。因此在这里我们使用了 pipe 函数，将那些我们不关注的变量值忽略掉。我们只会关心这些值是否存在，但是并不会关心这些值到底如何。对于 pipe 函数的详细用法可以如下所示:

```
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const fn1 = s => s.toLowerCase();
const fn2 = s => s.split('').reverse().join('');
const fn3 = s => s + '!'

const newFunc = pipe(fn1, fn2, fn3);
const result = newFunc('Time'); // emit!
```

## Selector Tests

```
describe('getViewState', ({ test }) => {
  test('with chats', ({ same, end }) => {
    const msg = 'should return the state needed to render';
    const chats = [
      createChat({
        id: 2,
        user: 'Bender',
        msg: 'Does Barry Manilow know you raid his wardrobe?',
        timeStamp: 451671300000
      }),
      createChat({
        id: 2,
        user: 'Andrew',
        msg: `Hey let's watch the mouth, huh?`,
        timeStamp: 451671480000 }),
      createChat({
        id: 1,
        user: 'Brian',
        msg: `We accept the fact that we had to sacrifice a whole Saturday in
              detention for whatever it was that we did wrong.`,
        timeStamp: 451692000000
      })
    ];

    const state = chats.map(addChat).reduce(reducer, reducer());

    const actual = getViewState(state);
    const expected = Object.assign(createState(), {
      chatLog: chats,
      recentlyActiveUsers: ['Bender', 'Andrew', 'Brian']
    });

    same(actual, expected, msg);
    end();
  });
});
```
