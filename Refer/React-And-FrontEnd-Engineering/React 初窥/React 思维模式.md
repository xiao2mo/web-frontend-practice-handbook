
# React

2013年，Facebook在Github上开源了React，一个专注于解决视图层的库，为当时很多苦于Angular 1性能问题的开发者指明了另一条路，也成为了近十年来前端领域发生的最大变革之一。React提供了一些新颖的概念、库和编程原则让你能够同时在服务端和客户端编写快速、紧凑、漂亮的代码来构建Web应用。从笔者数年来深入实践React技术栈的感受而言，React除却本身将用户界面抽象为组件树之外更大的意义在于将ES6、模块化与打包、组件化等等一系列工程化所需要的必要因素引入了前端领域，使前端领域从刀耕火种的原始时代慢慢过渡到各种工具百花齐放的时代。在React学习的过程中，我们可能会接触到如下技术概念或者原则，希望阅读完本书的读者能够对这些概念都形成自己的理解。

- ES6 React
- Virtual DOM：虚拟DOM
- Component-Driven Development：组件驱动开发
- Immutability：不变性
- Top-down Rendering：自上而下的渲染
- 渲染路径与优化
- 打包工具、构建请求、调试、路由等
- Isomorphic Application：同构应用

## Reference

- [Master the JavaScript Interview What is a Pure Function](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976)
- [So-You-Want-To-Be-A-Functional-Programmer](http://62f7d6c2.fromwiz.com/share/s/1yZZr21Yv4w42GorJm0oBXEi3AKTQa3rcARz2nKoQ71RpX_Z)
- [React’s diff algorithm](http://calendar.perfplanet.com/2013/diff/)
- [The Secrets of React’s virtual DOM](http://fluentconf.com/fluent2014/public/schedule/detail/32395)
- [Why is React’s concept of virtual DOM said to be moreperformant than dirty model checking?](http://stackoverflow.com/questions/21109361/why-is-reacts-concept-of-virtual-dom-said-to-be-more-performant-than-dirty-mode)
- [virtual-dom](https://github.com/Matt-Esch/virtual-dom)

# 小而美的视图层

React 与 VueJS 都是所谓小而美的视图层Library，而不是Angular 2这样兼容并包的Frameworks。任何一个编程生态都会经历三个阶段，第一个是原始时期，由于需要在语言与基础的API上进行扩充，这个阶段会催生大量的Tools。第二个阶段，随着做的东西的复杂化，需要更多的组织，会引入大量的设计模式啊，架构模式的概念，这个阶段会催生大量的Frameworks。第三个阶段，随着需求的进一步复杂与团队的扩充，就进入了工程化的阶段，各类分层MVC，MVP，MVVM之类，可视化开发，自动化测试，团队协同系统。这个阶段会出现大量的小而美的Library。
React 并没有提供很多复杂的概念与繁琐的API，而是以最少化为目标，专注于提供清晰简洁而抽象的视图层解决方案，同时对于复杂的应用场景提供了灵活的扩展方案，典型的譬如根据不同的应用需求引入MobX/Redux这样的状态管理工具。React在保证较好的扩展性、对于进阶研究学习所需要的基础知识完备度以及整个应用分层可测试性方面更胜一筹。不过很多人对React的意见在于其陡峭的学习曲线与较高的上手门槛，特别是JSX以及大量的ES6语法的引入使得很多的传统的习惯了jQuery语法的前端开发者感觉学习成本可能会大于开发成本。与之相比Vue则是典型的所谓渐进式库，即可以按需渐进地引入各种依赖，学习相关地语法知识。比较直观的感受是我们可以在项目初期直接从CDN中下载Vue库，使用熟悉的脚本方式插入到HTML中，然后直接在script标签中使用Vue来渲染数据。随着时间的推移与项目复杂度的增加，我们可以逐步引入路由、状态管理、HTTP请求抽象以及可以在最后引入整体打包工具。这种渐进式的特点允许我们可以根据项目的复杂度而自由搭配不同的解决方案，譬如在典型的活动页中，使用Vue能够兼具开发速度与高性能的优势。不过这种自由也是有利有弊，所谓磨刀不误砍材工，React相对较严格的规范对团队内部的代码样式风格的统一、代码质量保障等会有很好的加成。
一言蔽之，笔者个人觉得Vue会更容易被纯粹的前端开发者的接受，毕竟从直接以HTML布局与jQuery进行数据操作切换到指令式的支持双向数据绑定的Vue代价会更小一点，特别是对现有代码库的改造需求更少，重构代价更低。而React及其相对严格的规范可能会更容易被后端转来的开发者接受，可能在初学的时候会被一大堆概念弄混，但是熟练之后这种严谨的组件类与成员变量/方法的操作会更顺手一点。便如Dan Abramov所述，Facebook推出React的初衷是为了能够在他们数以百计的跨平台子产品持续的迭代中保证组件的一致性与可复用性。

# 数据流驱动的界面

在React中，应用利用State与Props对象实现单向数据流的传递。换言之，在一个多组件的架构中，某个父类组件只会负责响应自身的State，并且通过Props在链中传递给自己的子元素。

## 命令式编程与声明式编程

命令式编程（Imperative Programming）着眼于控制流，主要的代码会用于描述达成目标所需的特定操作步骤，即是直观地表现如何去做。声明式编程（Declarative Programming）则是将控制流抽象出来，主要的代码会用于描述某些独立的操作，即是表现做什么，不同操作之间往往不会强耦合。举例而言，我们希望将某个数组中的数值乘以2，并且返回新的数组，使用命令式编程的做法如下：
```
const doubleMap = numbers => {
  const doubled = [];
  for (let i = 0; i < numbers.length; i++) {
    doubled.push(numbers[i] * 2);
  }
  return doubled;
};

console.log(doubleMap([2, 3, 4])); // [4, 6, 8]
```
而使用声明式编程来实现相同的操作时，我们首先会将变换的过程抽象出来，以更清晰的方式描述这个过程：
```
const doubleMap = numbers => numbers.map(n => n * 2);

console.log(doubleMap([2, 3, 4])); // [4, 6, 8]
```
命令式编程中我们会频繁地使用声明语句（Statements），每个声明语句都是执行某些操作的代码片，常用的声明语句包括`for`、`if`、`switch`、`throw`这些。而函数式编程更加依赖于表达式（Expressions），每个表达式都会用于计算某些值，常见的表达式包括函数调用、函数组合等计算某些值的过程。典型的表达式的例子包括：
```
2 * 2
doubleMap([2, 3, 4])
Math.max(4, 3, 2)
```

## jQuery

jQuery作为了影响一代前端开发者的框架，是前端工具的典型代表，它留下了璀璨的痕迹与无法磨灭的脚印。笔者在这里以jQuery作为一个符号，来代表以DOM节点的操作为核心的一代的前端开发风格。那个年代里，要插入数据或者更改数据，都是直接操作DOM节点，或者手工的构造DOM节点。譬如从服务端获得一个用户列表之后，会通过构造`<i>`节点的方式将数据插入到DOM树中。jQuery这个框架本身非常的优秀并且在不断的完善中，但是它本身的定位，作为早期的跨浏览器的工具类屏蔽层在今天这个浏览器API逐步统一并且完善的今天，逐渐不是那么关键。因此，笔者认为jQuery会逐渐隐去的原因可能为：
- 现代浏览器的发展与逐步统一的原生API：由于浏览器的历史原因，曾经的前端开发为了兼容不同浏览器怪癖，需要增加很多成本。jQuery 由于提供了非常易用的 API，屏蔽了浏览器差异，极大地提高了开发效率。这也导致很多前端只懂 jQuery。其实这几年浏览器更新很快，也借鉴了很多 jQuery 的 API，如 `querySelector`，`querySelectorAll` 和 jQuery 选择器同样好用，而且性能更优。
- 前端由以DOM为中心到以数据/状态为中心：jQuery 代表着传统的以 DOM 为中心的开发模式，但现在复杂页面开发流行的是以 React 为代表的以**数据/状态**为中心的开发模式。应用复杂后，直接操作 DOM 意味着手动维护状态，当状态复杂后，变得不可控。React 以状态为中心，自动帮我们渲染出 DOM，同时通过高效的 DOM Diff 算法，也能保证性能。
- 不支持同构渲染与跨平台渲染：React Native中不支持jQuery。同构就是前后端运行同一份代码，后端也可以渲染出页面，这对 SEO 要求高的场景非常合适。由于 React 等流行框架天然支持，已经具有可行性。当我们在尝试把现有应用改成同构时，因为代码要运行在服务器端，但服务器端没有 DOM，所以引用 jQuery 就会报错。这也是要移除 jQuery 的迫切原因。同时不但要移除 jQuery，在很多场合也要避免直接操作 DOM。
- 性能缺陷：jQuery的性能已经不止一次被诟病了，在移动端兴起的初期，就出现了Zepto这样的轻量级框架，Angular 1也内置了jqlite这样的小工具。前端开发一般不需要考虑性能问题，但你想在性能上追求极致的话，一定要知道 jQuery 性能很差。原生 API 选择器相比 jQuery 丰富很多，如 `document.getElementsByClassName` 性能是 `$(classSelector)` 的 50 多倍！

对于很多初学React的开发者可能会疑问，到底是否应该继续使用jQuery？笔者虽然不提倡使用jQuery，但是也不完全否定可以使用jQuery，还是需要根据具体的应用场景与控件需求来决定。

## 声明式组件

我们在上文中提到过，声明式编程的核心理念在于描述做什么，通过声明式的方式我们能够以链式方法调用的形式对于输入的数据流进行一系列的变换处理，本部分我们还是以jQuery为例，阐述命令式编程与声明式编程在Web前端开发中的实际应用对比。譬如我们以jQuery开发简单的登录界面：
```
jQuery(function($) {

  var username = '';
  var password = '';

  // Disable the button at start
  $('#signup-button').attr('disabled', true);

  // Email field
  $('#email-field').on('blur', function() {
    username = $(this).val();
    if (username == '') {
      $('#email-error').html('Please enter email address');
      $('#signup-button').attr('disabled', true);
    } else {
      checkValues();
    }
  });

  // Password field
  $('#password-field').on('blur', function() {
    password = $(this).val();
    if (password == '') {
      $('#password-error').html('Please enter password');
      $('#signup-button').attr('disabled', true);
    } else {
      checkValues();
    }
  });

  // Both fields
  function checkValues() {
    if (username != '' && password != '') {
      $('#email-error').html('');
      $('#password-error').html('');
      $('#signup-button').attr('disabled', false);
    }
  }

});
```
上述代码中我们以符合平时思维逻辑的、声明语句形式的方式描述了整个业务逻辑，这就是典型的命令式编程思想。不过这种方式也显而易见的存在很多的代码冗余，导致整体的可读性与重构性降低，譬如邮箱与密码这两个输入域都会在失去焦点时进行验证，并且判断是否设置按钮失效。而在声明式编程中，我们可以将公用的部分业务逻辑代码，即是偏向于计算的、表达式形式的代码剥离出来，可以得到如下的封装：
```
jQuery(function($) {

  function checkIfEmpty(e) { return !e.target.value; }
  function checkIfBothEmpty(noEmail, noPass) { return noEmail || noPass; }

  function getEmailMessage(noEmail) {
    return noEmail ? 'Please enter email address.' : '';
  }

  function getPasswordMessage(noPassword) {
    return noPassword ? 'Please enter password.' : '';
  }

  // Email field
  var email = $('#email-field').asEventStream('blur').map(checkIfEmpty);
  email.map(getEmailMessage).assign($('#email-error'), 'html');

  // Password field
  var password = $('#password-field').asEventStream('blur').map(checkIfEmpty);
  password.map(getPasswordMessage).assign($('#password-error'), 'html');

  // Both fields
  Bacon
    .combineWith(checkIfBothEmpty, email, password)
    .assign($('#signup-button'), 'attr', 'disabled')
  ;

});
```
代码更加清晰易懂，并且对于空判断这些公共逻辑代码的提出也方便了我们进行重构或者对于业务逻辑的变化进行快速响应。未来如果我们需要添加Checkbox、DialogBox等控件时，声明式的代码增加会远小于命令式，并且我们也只是需要创建新的数据流而已。


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
sumRange 1 10 0 =      -- sumRange (1 + 1)  10 (0 + 1)
sumRange 2 10 1 =      -- sumRange (2 + 1)  10 (1 + 2)
sumRange 3 10 3 =      -- sumRange (3 + 1)  10 (3 + 3)
sumRange 4 10 6 =      -- sumRange (4 + 1)  10 (6 + 4)
sumRange 5 10 10 =     -- sumRange (5 + 1)  10 (10 + 5)
sumRange 6 10 15 =     -- sumRange (6 + 1)  10 (15 + 6)
sumRange 7 10 21 =     -- sumRange (7 + 1)  10 (21 + 7)
sumRange 8 10 28 =     -- sumRange (8 + 1)  10 (28 + 8)
sumRange 9 10 36 =     -- sumRange (9 + 1)  10 (36 + 9)
sumRange 10 10 45 =    -- sumRange (10 + 1) 10 (45 + 10)
sumRange 11 10 55 =    -- 11 > 10 => 55
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

# Virtual DOM

如我们所知，在浏览器渲染网页的过程中，加载到HTML文档后，会将文档解析并构建DOM树，然后将其与解析CSS生成的CSSOM树一起结合产生爱的结晶——RenderObject树，然后将RenderObject树渲染成页面（当然中间可能会有一些优化，比如RenderLayer树）。这些过程都存在与渲染引擎之中，渲染引擎在浏览器中是于JavaScript引擎（JavaScriptCore也好V8也好）分离开的，但为了方便JS操作DOM结构，渲染引擎会暴露一些接口供JavaScript调用。由于这两块相互分离，通信是需要付出代价的，因此JavaScript调用DOM提供的接口性能不咋地。各种性能优化的最佳实践也都在尽可能的减少DOM操作次数。
而虚拟DOM干了什么？它直接用JavaScript实现了DOM树（大致上）。组件的HTML结构并不会直接生成DOM，而是映射生成虚拟的JavaScript DOM结构，React又通过在这个虚拟DOM上实现了一个 diff 算法找出最小变更，再把这些变更写入实际的DOM中。这个虚拟DOM以JS结构的形式存在，计算性能会比较好，而且由于减少了实际DOM操作次数，性能会有较大提升。React渲染出来的HTML标记都包含了`data-reactid`属性，这有助于React中追踪DOM节点。很多人第一次学习React的时候都会觉得JSX语法看上去非常怪异，这种背离传统的HTML模板开发方式真的靠谱吗？（在2.0版本中Vue也引入了JSX语法支持）。我们并不能单纯地将JSX与传统的HTML模板相提并论，JSX本质上是对于`React.createElement `函数的抽象，而该函数主要的作用是将朴素的JavaScript中的对象映射为某个DOM表示。其大概思想图示如下：

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2017/1/1/QQ20170104-01111.png)

在现代浏览器中，对于JavaScript的计算速度远快于对DOM进行操作，特别是在涉及到重绘与重渲染的情况下。并且以JavaScript对象代替与平台强相关的DOM，也保证了多平台的支持，譬如在ReactNative的协助下我们很方便地可以将一套代码运行于iOS、Android等多平台。总结而言，JSX本质上还是JavaScript，因此我们在保留了JavaScript函数本身在组合、语法检查、调试方面优势的同时又能得到类似于HTML这样声明式用法的便利与较好的可读性。

## DOM 元素

## 组件元素