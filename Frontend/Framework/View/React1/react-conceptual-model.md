#  Theoretical Concepts

> [react-basic](https://github.com/reactjs/react-basic/tree/1512678469e04da02fe052ba884480a78f2e03ee)


在正式学习React之前，我们希望能脱离React本身来了解下React的设计思想，这有助于我们更好地运用React与进行更好地架构设计。当然，这里讨论的一些设计理念肯定还是有争论的，见仁见智，各有所感。React.js本身的学习与实现是偏重于工程解决方案、算法优化、代码兼容以及调试工具这些方法论，不过，这些都是会随着时间以及应用长久的变迁发生改变，唯有设计思想能够绵延流长。术道相济，方能长久。

## Transformation(转换)

React的核心前提即是改变了jQuery这种以DOM操作为核心到以数据流驱动为核心，View是不同的数据的投射。并且对于数据的处理函数应该是纯函数，即相同的输入有相同的输出而不会产生其他副作用：

```

function NameBox(name) {
  return { fontWeight: 'bold', labelContent: name };
}

'Sebastian Markbåge' ->
{ fontWeight: 'bold', labelContent: 'Sebastian Markbåge' };

```

这样可以极大地方便对于View构造函数的重用与单元测试等。

## Abstraction(抽象)

对于一个复杂的UI，肯定不能全都塞到一个函数里处理，这就是React另一个重要的思想，将UI抽象拆分为多个可重用的部分，并且各个部分要对上层隐藏实现细节，便如下面这样的进行函数调用：

```

function FancyUserBox(user) {
  return {
    borderStyle: '1px solid blue',
    childContent: [
      'Name: ',
      NameBox(user.firstName + ' ' + user.lastName)
    ]
  };
}

```

```
{ firstName: 'Sebastian', lastName: 'Markbåge' } ->
{
  borderStyle: '1px solid blue',
  childContent: [
    'Name: ',
    { fontWeight: 'bold', labelContent: 'Sebastian Markbåge' }
  ]
};

```

## Composition(组合)

为了达到真正意义上的重用目标，并不仅仅就是把那个叶子组件组合进一个新的容器，我们也需要在容器中构建出能够组合其他抽象组件的抽象组件。这里我认为的组合要点在于如何把两个或者更多的抽象组件合并成一个新的：

```



function FancyBox(children) {
  return {
    borderStyle: '1px solid blue',
    children: children
  };
}

function UserBox(user) {
  return FancyBox([
    'Name: ',
    NameBox(user.firstName + ' ' + user.lastName)
  ]);
}
```

## State

一个UI并不仅仅是服务端或者业务逻辑的重现，实际上有很多特定的状态会被投射到UI上。譬如，如果你正在输入一个文本框，这个并不会复制到其他的Tab或者你的手机浏览器中。另外，滚动位置也是一个典型的你并不想投射到其他地方的状态。我们希望我们的数据模型会更加地固定，因此，我们从顶部组件开始将更新函数一级一级地注入到实际的显示的那个模块上。

```



function FancyNameBox(user, likes, onClick) {
  return FancyBox([
    'Name: ', NameBox(user.firstName + ' ' + user.lastName),
    'Likes: ', LikeBox(likes),
    LikeButton(onClick)
  ]);
}

// Implementation Details

var likes = 0;
function addOneMoreLike() {
  likes++;
  rerender();
}

// Init

FancyNameBox(
  { firstName: 'Sebastian', lastName: 'Markbåge' },
  likes,
  addOneMoreLike
);
```

注意，这里的例子还是用了带副作用的函数来更新状态，不过我本意是想采用纯函数，即每次返回最新的状态来完成这个工作。我会在下面的例子里阐述这个观点。

## Memoization

纯函数的一个好处就是其结果是可以缓存的，这就避免了重复调用带来的性能浪费。我们可以创建一个自带缓存的函数来记录最后调用的参数与返回值，这样我们可以自动地在相同参数的情况下直接返回：

```



function memoize(fn) {
  var cachedArg;
  var cachedResult;
  return function(arg) {
    if (cachedArg === arg) {
      return cachedResult;
    }
    cachedArg = arg;
    cachedResult = fn(arg);
    return cachedResult;
  };
}

var MemoizedNameBox = memoize(NameBox);

function NameAndAgeBox(user, currentTime) {
  return FancyBox([
    'Name: ',
    MemoizedNameBox(user.firstName + ' ' + user.lastName),
    'Age in milliseconds: ',
    currentTime - user.dateOfBirth
  ]);
}
```

## Lists

大部分的UI组件都是会包含着列表，每一行会显示不同的值。我们需要维护一个Map来记录列表中每个项目的状态信息：

```



function UserList(users, likesPerUser, updateUserLikes) {
  return users.map(user => FancyNameBox(
    user,
    likesPerUser.get(user.id),
    () => updateUserLikes(user.id, likesPerUser.get(user.id) + 1)
  ));
}

var likesPerUser = new Map();
function updateUserLikes(id, likeCount) {
  likesPerUser.set(id, likeCount);
  rerender();
}

UserList(data.users, likesPerUser, updateUserLikes);
```

注意，在这个函数里我们传入了多个值，这样就不能缓存结果了。

## Continuations

B狗的事情发生了，因为存在着很多的列表，我们也需要维护很多的模板，不同的列表显示的数据有交集有差异，譬如用户列表和你关注的用户列表，它们可能就是操作按钮上的不同。我们可以将部分模板和业务逻辑解耦合以下，譬如使用柯里化这种构造高阶函数的手段。这种手段本身并不能减少业务逻辑或者最终模板的复杂度，不过能够将一部分代码移出业务逻辑：

```

function FancyUserList(users) {

  return FancyBox(

    UserList.bind(null, users)

  );

}



const box = FancyUserList(data.users);

const resolvedChildren = box.children(likesPerUser, updateUserLikes);

const resolvedBox = {

  ...box,

  children: resolvedChildren

};



```

## State Map

早前我们就知道著名的23种设计模式里会避免重复的实现一些通用模式，我们也可以将一些状态管理的逻辑函数移到统一的初级函数里，这样就方便重复使用了：

```

function FancyBoxWithState(
  children,
  stateMap,
  updateState
) {
  return FancyBox(
    children.map(child => child.continuation(
      stateMap.get(child.key),
      updateState
    ))
  );
}

function UserList(users) {
  return users.map(user => {
    continuation: FancyNameBox.bind(null, user),
    key: user.id
  });
}

function FancyUserList(users) {
  return FancyBoxWithState.bind(null,
    UserList(users)
  );
}

const continuation = FancyUserList(data.users);
continuation(likesPerUser, updateUserLikes);
```

## Memoization Map

上面提到过，当存在多个输入参数的情况下要再想进行缓存就会麻烦一点，我们要使用一些复杂的缓存策略来平衡内存使用与频次。幸运的是很多地方View还是比较固定的，整个树上的相同位置的值一般都是相同的，因此可以用树结构来进行缓存。

```

function memoize(fn) {
  return function(arg, memoizationCache) {
    if (memoizationCache.arg === arg) {
      return memoizationCache.result;
    }
    const result = fn(arg);
    memoizationCache.arg = arg;
    memoizationCache.result = result;
    return result;
  };
}

function FancyBoxWithState(
  children,
  stateMap,
  updateState,
  memoizationCache
) {
  return FancyBox(
    children.map(child => child.continuation(
      stateMap.get(child.key),
      updateState,
      memoizationCache.get(child.key)
    ))
  );
}

const MemoizedFancyNameBox = memoize(FancyNameBox);
```

## Algebraic Effects

如果我们在一个嵌套多层的UI体系里每次都把一些参数一级一级的传递下去，那约莫是非常麻烦的。因此我们需要创造一些捷径来在两个不直接相连的抽象组件之间传递数据，而不需要通过中间层。在React里面叫他Context。（官方文档里Context还是属于测试阶段）。有时候这个数据依赖的关系并不严格按照抽象树的逻辑，譬如在一个布局算法里你需要知道你的子元素的大小你才能够完整地决定他们的位置。我在这里使用 Algebraic Effects 作为 proposed for ECMAScript。

```


function ThemeBorderColorRequest() { }

function FancyBox(children) {
  const color = raise new ThemeBorderColorRequest();
  return {
    borderWidth: '1px',
    borderColor: color,
    children: children
  };
}

function BlueTheme(children) {
  return try {
    children();
  } catch effect ThemeBorderColorRequest -> [, continuation] {
    continuation('blue');
  }
}

function App(data) {
  return BlueTheme(
    FancyUserList.bind(null, data.users)
  );
}


```


> Further Reading

> - [我的前端之路](https://segmentfault.com/a/1190000004292245)

