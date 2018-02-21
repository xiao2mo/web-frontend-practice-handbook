[![返回目录](https://parg.co/UY3)](https://parg.co/U0I) 



[![](https://parg.co/UbM)](https://parg.co/bWg)


# React 思维模式：函数式编程




# 函数式编程


近年来，函数式编程（Functional Programming）已经成为了JavaScript社区中炙手可热的主题之一，无论你是否欣赏这种编程理念，相信你都已经对它有所了解。即使是前几年函数式编程尚未流行的时候，我已经在很多的大型应用代码库中发现了不少对于函数式编程理念的深度实践。函数式编程即是在软件开发的工程中避免使用共享状态（Shared State）、可变状态（Mutable Data）以及副作用（Side Effects）。函数式编程中整个应用由数据驱动，应用的状态在不同纯函数之间流动。与偏向命令式编程的面向对象编程而言，函数式编程其更偏向于声明式编程，代码更加简洁明了、更可预测，并且可测试性也更好。。函数式编程本质上也是一种编程范式（Programming Paradigm），其代表了一系列用于构建软件系统的基本定义准则。其他编程范式还包括面向对象编程（Object Oriented Programming）与过程程序设计（Procedural Programming）。



## 纯函数


顾名思义，纯函数往往指那些仅根据输入参数决定输出并且不会产生任何副作用的函数。纯函数最优秀的特性之一在于其结果的可预测性：

```
var z = 10;
function add(x, y) {
    return x + y;
}
console.log(add(1, 2)); // prints 3
console.log(add(1, 2)); // still prints 3
console.log(add(1, 2)); // WILL ALWAYS print 3
```
在`add`函数中并没有操作`z`变量，即没有读取`z`的数值也没有修改`z`的值。它仅仅根据参数输入的`x`与`y`变量然后返回二者相加的和。这个`add`函数就是典型的纯函数，而如果在`add`函数中涉及到了读取或者修改`z`变量，那么它就失去了纯洁性。我们再来看另一个函数:
```
function justTen() {
    return 10;
}
```
对于这样并没有任何输入参数的函数，如果它要保持为纯函数，那么该函数的返回值就必须为常量。不过像这种固定返回为常量的函数还不如定义为某个常量呢，就没必要大材小用用函数了，因此我们可以认为绝大部分的有用的纯函数至少允许一个输入参数。再看看下面这个函数:
```
function addNoReturn(x, y) {
    var z = x + y
}
```
注意这个函数并没有返回任何值，它确实拥有两个输入参数`x`与`y`，然后将这两个变量相加赋值给`z`，因此这样的函数也可以认为是无意义的。这里我们可以说，绝大部分有用的纯函数必须要有返回值。总结而言，纯函数应该具有以下几个特效:
- 绝大部分纯函数应该拥有一或多个参数值。
- 纯函数必须要有返回值。
- 相同输入的纯函数的返回值必须一致。
- 纯函数不能够产生任何的副作用。






## 共享状态与副作用


在软件开发中有个很有趣的观点：共享的状态时万恶之源。共享状态（Shared State）可以是存在于共享作用域（全局作用域与闭包作用域）或者作为传递到不同作用域的对象属性的任何变量、对象或者内存空间。在面向对象编程中，我们常常是通过添加属性到其他对象的方式共享某个对象。共享状态问题在于，如果开发者想要理解某个函数的作用，必须去详细了解该函数可能对于每个共享变量造成的影响。譬如我们现在需要将客户端生成的用户对象保存到服务端，可以利用`saveUser()`函数向服务端发起请求，将用户信息编码传递过去并且等待服务端响应。而就在你发起请求的同时，用户修改了个人头像，触发了另一个函数`updateAvatar()`以及另一次`saveUser()`请求。正常来说，服务端会先响应第一个请求，并且根据第二个请求中用户参数的变更对于存储在内存或者数据库中的用户信息作相应的修改。不过某些意外情况下，可能第二个请求会比第一个请求先到达服务端，这样用户选定的新的头像反而会被第一个请求中的旧头像覆写。这里存放在服务端的用户信息就是所谓的共享状态，而因为多个并发请求导致的数据一致性错乱也就是所谓的竞态条件（Race Condition），也是共享状态导致的典型问题之一。另一个共享状态的常见问题在于不同的调用顺序可能会触发未知的错误，这是因为对于共享状态的操作往往是时序依赖的。
```
const x = {
  val: 2
};


const x1 = () => x.val += 1;


const x2 = () => x.val *= 2;


x1();
x2();


console.log(x.val); // 6


const y = {
  val: 2
};


const y1 = () => y.val += 1;


const y2 = () => y.val *= 2;


// 交换了函数调用顺序
y2();
y1();


// 最后的结果也受到了影响

console.log(y.val); // 5
```


副作用指那些在函数调用过程中没有通过返回值表现的任何可观测的应用状态变化，常见的副作用包括但不限于：
- 修改任何外部变量或者外部对象属性
- 在控制台中输出日志
- 写入文件
- 发起网络通信
- 触发任何外部进程事件
- 调用任何其他具有副作用的函数


在函数式编程中我们会尽可能地规避副作用，保证程序更易于理解与测试。Haskell或者其他函数式编程语言通常会使用[Monads](https://en.wikipedia.org/wiki/Monad_%28functional_programming%29)来隔离与封装副作用。在绝大部分真实的应用场景进行编程开始时，我们不可能保证系统中的全部函数都是纯函数，但是我们应该尽可能地增加纯函数的数目并且将有副作用的部分与纯函数剥离开来，特别是将业务逻辑抽象为纯函数，来保证软件更易于扩展、重构、调试、测试与维护。这也是很多前端框架鼓励开发者将用户的状态管理与组件渲染相隔离，构建松耦合模块的原因。


## 不可变性


不可变对象（Immutable Object）指那些创建之后无法再被修改的对象，与之相对的可变对象（Mutable Object）指那些创建之后仍然可以被修改的对象。不可变性（Immutability）是函数式编程的核心思想之一，保证了程序运行中数据流的无损性。如果我们忽略或者抛弃了状态变化的历史，那么我们很难去捕获或者复现一些奇怪的小概率问题。使用不可变对象的优势在于你在程序的任何地方访问任何的变量，你都只有只读权限，也就意味着我们不用再担心意外的非法修改的情况。另一方面，特别是在多线程编程中，每个线程访问的变量都是常量，因此能从根本上保证线程的安全性。总结而言，不可变对象能够帮助我们构建简单而更加安全的代码。
在JavaScript中，我们需要搞清楚`const`与不可变性之间的区别。`const`声明的变量名会绑定到某个内存空间而不可以被二次分配，其并没有创建真正的不可变对象。你可以不修改变量的指向，但是可以修改该对象的某个属性值，因此`const`创建的还是可变对象。JavaScript中最方便的创建不可变对象的方法就是调用`Object.freeze()`函数，其可以创建一层不可变对象：
```
const a = Object.freeze({
  foo: 'Hello',
  bar: 'world',
  baz: '!'
});


a.foo = 'Goodbye';

// Error: Cannot assign to read only property 'foo' of object Object
```
不过这种对象并不是彻底的不可变数据，譬如如下的对象就是可变的：
```
const a = Object.freeze({
  foo: { greeting: 'Hello' },
  bar: 'world',
  baz: '!'
});


a.foo.greeting = 'Goodbye';


console.log(`${ a.foo.greeting }, ${ a.bar }${a.baz}`);
```
如上所见，顶层的基础类型属性是不可以改变的，不过如果对象类型的属性，譬如数组等，仍然是可以变化的。在很多函数式编程语言中，会提供特殊的不可变数据结构Trie Data Structures来实现真正的不可变数据结构，任何层次的属性都不可以被改变。Tries还可以利用结构共享（Structural Sharing）的方式来在新旧对象之间共享未改变的对象属性值，从而减少内存占用并且显著提升某些操作的性能。JavaScript中虽然语言本身并没有提供给我们这个特性，但是可以通过[Immutable.js](https://github.com/facebook/immutable-js)与[Mori](https://github.com/swannodette/mori)这些辅助库来利用Tries的特性。我个人两个库都使用过，不过在大型项目中会更倾向于使用Immutable.js。估计到这边，很多习惯了命令式编程的同学都会大吼一句：在没有变量的世界里我又该如何编程呢？不要担心，现在我们考虑下我们何时需要去修改变量值：譬如修改某个对象的属性值，或者在循环中修改某个循环计数器的值。而函数式编程中与直接修改原变量值相对应的就是创建原值的一个副本并且将其修改之后赋予给变量。而对于另一个常见的循环场景，譬如我们所熟知的`for`,`while`,`do`,`repeat`这些关键字，我们在函数式编程中可以使用递归来实现原本的循环需求:
```
// 简单的循环构造
var acc = 0;
for (var i = 1; i <= 10; ++i)
    acc += i;
console.log(acc); // prints 55
// 递归方式实现
function sumRange(start, end, acc) {
    if (start > end)
        return acc;
    return sumRange(start + 1, end, acc + start)
}
console.log(sumRange(1, 10, 0)); // prints 55
```
注意在递归中，与变量i相对应的即是start变量，每次将该值加1，并且将acc+start作为当前和值传递给下一轮递归操作。在递归中，并没有修改任何的旧的变量值，而是根据旧值计算出新值并且进行返回。不过如果真的让你把所有的迭代全部转变成递归写法，估计得疯掉，这个不可避免地会受到JavaScript语言本身的混乱性所影响，并且迭代式的思维也不是那么容易理解的。而在Elm这种专门面向函数式编程的语言中，语法会简化很多:
```
sumRange start end acc =
    if start > end then
        acc
    else
        sumRange (start + 1) end (acc + start) 
```
其每一次的迭代记录如下:
```
sumRange 1 10 0 =      -- sumRange (1 + 1)  10 (0 + 1)
sumRange 2 10 1 =      -- sumRange (2 + 1)  10 (1 + 2)
sumRange 3 10 3 =      -- sumRange (3 + 1)  10 (3 + 3)
sumRange 4 10 6 =      -- sumRange (4 + 1)  10 (6 + 4)
sumRange 5 10 10 =     -- sumRange (5 + 1)  10 (10 + 5)
sumRange 6 10 15 =     -- sumRange (6 + 1)  10 (15 + 6)
sumRange 7 10 21 =     -- sumRange (7 + 1)  10 (21 + 7)
sumRange 8 10 28 =     -- sumRange (8 + 1)  10 (28 + 8)
sumRange 9 10 36 =     -- sumRange (9 + 1)  10 (36 + 9)
sumRange 10 10 45 =    -- sumRange (10 + 1) 10 (45 + 10)
sumRange 11 10 55 =    -- 11 > 10 => 55
55
```


## 高阶函数


函数式编程倾向于重用一系列公共的纯函数来处理数据，而面向对象编程则是将方法与数据封装到对象内。这些被封装起来的方法复用性不强，只能作用于某些类型的数据，往往只能处理所属对象的实例这种数据类型。而函数式编程中，任何类型的数据则是被一视同仁，譬如`map()`函数允许开发者传入函数参数，保证其能够作用于对象、字符串、数字，以及任何其他类型。JavaScript中函数同样是一等公民，即我们可以像其他类型一样处理函数，将其赋予变量、传递给其他函数或者作为函数返回值。而高阶函数（Higher Order Function）则是能够接受函数作为参数，能够返回某个函数作为返回值的函数。高阶函数经常用在如下场景：
- 利用回调函数、Promise或者Monad来抽象或者隔离动作、作用以及任何的异步控制流
- 构建能够作用于泛数据类型的工具函数
- 函数重用或者创建柯里函数
- 将输入的多个函数并且返回这些函数复合而来的复合函数


典型的高阶函数的应用就是复合函数，作为开发者，我们天性不希望一遍一遍地重复构建、测试与部分相同的代码，我们一直在寻找合适的只需要写一遍代码的方法以及如何将其重用于其他模块。代码重用听上去非常诱人，不过其在很多情况下是难以实现的。如果你编写过于偏向具体业务的代码，那么就会难以重用。而如果你把每一段代码都编写的过于泛化，那么你就很难将这些代码应用于具体的有业务场景，而需要编写额外的连接代码。而我们真正追寻的就是在具体与泛化之间寻求一个平衡点，能够方便地编写短小精悍而可复用的代码片，并且能够将这些小的代码片快速组合而解决复杂的功能需求。
在函数式编程中，函数就是我们能够面向的最基础代码块，而在函数式编程中，对于基础块的组合就是所谓的函数复合（Function Composition）。我们以如下两个简单的JavaScript函数为例:


```
var add10 = function(value) {
    return value + 10;
};
var mult5 = function(value) {
    return value * 5;
};
```
如果你习惯了使用ES6，那么可以用Arrow Function重构上述代码:
```
var add10 = value => value + 10; 
var mult5 = value => value * 5;

```
现在看上去清爽多了吧，下面我们考虑面对一个新的函数需求，我们需要构建一个函数，首先将输入参数加10然后乘以5，我们可以创建一个新函数如下:
```
var mult5AfterAdd10 = value => 5 * (value + 10)

```
尽管上面这个函数也很简单，我们还是要避免任何函数都从零开始写，这样也会让我们做很多重复性的工作。我们可以基于上文的add10与mult5这两个函数来构建新的函数:
```
var mult5AfterAdd10 = value => mult5(add10(value));

```
在mult5AfterAdd10函数中，我们已经站在了add10与mult5这两个函数的基础上，不过我们可以用更优雅的方式来实现这个需求。在数学中，我们认为`f ∘ g`是所谓的Function Composition，因此``f ∘ g`可以认为等价于`f(g(x))`，我们同样可以基于这种思想重构上面的mult5AfterAdd10。不过JavaScript中并没有原生的Function Composition支持，在Elm中我们可以用如下写法:
```
add10 value =
    value + 10
mult5 value =
    value * 5
mult5AfterAdd10 value =

    (mult5 << add10) value
```
这里的`<<`操作符也就指明了在Elm中是如何组合函数的，同时也较为直观的展示出了数据的流向。首先value会被赋予给add10，然后add10的结果会流向mult5。另一个需要注意的是，`(mult5 << add10)`中的中括号是为了保证函数组合会在函数调用之前。你也可以组合更多的函数:
```
f x =

   (g << h << s << r << t) x
```
如果在JavaScript中，你可能需要以如下的递归调用来实现该功能:
```
g(h(s(r(t(x)))))

```




## 渲染函数


与React相比，Vue则是非常直观的代码架构，每个Vue组件都包含一个script标签，这里我们可以显式地声明依赖，声明操作数据的方法以及定义从其他组件继承而来的属性。而每个组件还包含了一个template标签，等价于React中的render函数，可以直接以属性方式绑定数据。最后，每个组件还包含了style标签而保证了可以直接隔离组件样式。我们可以先来看一个典型的Vue组件，非常直观易懂，而两相比较之下也有助于理解React的设计思想。
```
<script>
export default {
  components: {},
  data() {
    return {
      notes: [],
    };
  },
  created() {
    this.fetchNotes();
  },
  methods: {
    addNote(title, body, createdAt, flagged) {
     return database('notes').insert({ title, body, created_at: createdAt, flagged });
  },
};
</script>
<template>
  <div class="app">
    <header-menu
      :addNote='addNote'
      >
  </div>
</template>
<style scoped>
  .app {
    width: 100%;
    height: 100%;
    postion: relative;
  }

</style>
```
当我们将视角转回到React中，作为单向数据绑定的组件可以抽象为如下渲染函数:
```
View = f(Data)
```
这种对用户界面的抽象方式确实令笔者耳目一新，这样我们对于界面的组合搭配就可以抽象为对于函数的组合，某个复杂的界面可以解构为数个不同的函数调用的组合变换。0.14版本时，React放弃了MixIn功能，而推荐使用高阶函数模式进行组件组合。这里很大一个考虑便是Mixin属于面向对象编程，是多重继承的一种实现，而函数式编程里面的Composition（合成）可以起到同样的作用，并且能够保证组件的纯洁性而没有副作用。




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
## Continuations
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
## Memoization Map
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

## Algebraic Effects
如果我们在一个嵌套多层的UI体系里每次都把一些参数一级一级的传递下去，那约莫是非常麻烦的。因此我们需要创造一些捷径来在两个不直接相连的抽象组件之间传递数据，而不需要通过中间层。在React里面叫他Context。（官方文档里Context还是属于测试阶段）。有时候这个数据依赖的关系并不严格按照抽象树的逻辑，譬如在一个布局算法里你需要知道你的子元素的大小你才能够完整地决定他们的位置。我在这里使用 Algebraic Effects 作为 proposed for ECMAScript。
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
