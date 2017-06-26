# 函数响应式编程与MobX

## Reference
> https://gist.github.com/staltz/868e7e9bc2a7b8c1f754

## 函数响应式编程（是否需要加上RxJS的例子）

响应式编程（Reactive Programming），又被译为反应式编程。是一种完全不同于传统的命令式编程的编程范式。

响应式编程是一种面向数据流和变化传播的编程范式，概念比较难以理解。举个最简单的例子，EXCEL中的计算功能就是典型的响应式。例如单元格a1的值等于b1+c1，如果b1中的值或者c1中的值的发生了变化，则a1中的结果也会自动更新。

响应式编程中的核心是流（stream）。流可以看做是时变函数的抽象，以时间作为自变量，发射的事件按照顺序分布在这根时间轴上。流会发射三种类型的事件：某种类型的值，错误，完成信号。
![](https://camo.githubusercontent.com/36c0a9ffd8ed22236bd6237d44a1d3eecbaec336/687474703a2f2f692e696d6775722e636f6d2f634c344d4f73532e706e67)

响应式的编程中，任何事物都可以抽象为流，例如一个值，一个点击事件，等等。通过监听这些流，定义回调函数，从而实现结果的自动更新。

同时在流的处理上，引入了函数式编程思想，通过纯函数，例如map，filter，merge等，对流进行操作操作，从而生成新的流，满足开发需要。这一点在处理一些复杂事件的时候，将会变的非常简单。例如处理多次点击事件，只需要数行代码：
![](https://camo.githubusercontent.com/995c301de2f566db10748042a5a67cc5d9ac45d9/687474703a2f2f692e696d6775722e636f6d2f484d47574e4f352e706e67)。

函数响应式编程中把异步事件都抽象为流，通过流的处理大大减少了处理异步事件的难度。如今的前端已经不仅仅是后台数据的展示，逐渐发展为交互丰富的webapp。其中的复杂度，数据量，异步事件都远超以往。为函数响应式编程的发展提供了肥沃的土壤，催生出了诸如RxJS之类的采用FR范式的JavaScript库。

本文中，我们将介绍搭配React使用的状态管理库-MobX。MobX正不仅仅是一个函数响应式库，它还在此基础上做了拓展，与传统的函数响应式库还有所不同，称为透明函数响应式库。

## MobX
MobX的理念非常的简单，所有的应用状态都是observable的，界面可以从observable state推导出，从而实现界面的自动更新。
![](https://github.com/mobxjs/mobx/raw/master/docs/flow.png)

MobX与React配合的天衣无缝，React根据应用的state来渲染界面，View = f(state)，而MobX使得state变化时，自动更新界面，View <= f(state)。

### MobX中的核心概念
MobX中一共有四个核心概念：
- observable state
- computed value
- reaction
- action
下面我们将一一介绍这些概念。

#### Observable state
现代前端，界面是由数据驱动的，而这些数据就是应用的核心，也就是所谓的state。状态可以是数值，字符串，数组，对象等等。MobX做的就是将这些状态值包装，使它们变为 observable state，也就是可观察状态值。一旦这些状态发生变化，则会遍历自身注册的观察者列表，执行回调。使用MobX提供的 `observable` 就可以将普通值转换为 observable 值。
```
const map = observable(asMap({ key: "value"}));
map.set("key", "new value");

const list = observable([1, 2, 4]);
list[2] = 3;

const person = observable({
    firstName: "Clive Staples",
    lastName: "Lewis"
});
person.firstName = "C.S.";

const temperature = observable(20);
temperature.set(25);
```

#### Computed value
计算值是用observable state作为输入，使用一个纯函数计算得出的值。计算值的特点是既是observable的，又是observer。因此，当observable state发生改变时，计算值也会同步更新，而计算值维护的观察者，也会同步更新，

#### Reaction
Reaction与计算值互补，计算值通过纯函数产生新值，而reaction负责产生side effect，例如网络请求，更新DOM，在控制台打印信息等等。

#### Action
Action是一切会导致observable state变更的行为，例如用户事件，后台数据推送等等。在MobX的严格模式中，只有使用定义之后的action才可以更改state。


下面的例子，我们结合React把MobX中的四个重要概念做了演示：

```
class Person {
  @observable firstName = "Michel";
  @observable lastName = "Weststrate";
  @observable nickName;
  
  @computed get fullName() {
    return this.firstName + " " + this.lastName;
  }
}

const michel = new Person();

// Reaction: log the profile info whenever it changes
autorun(() => console.log(person.nickName ? person.nickName : person.fullName));

// Example React component that observes state
const profileView = observer(props => {
  if (props.person.nickName)
    return <div>{props.person.nickName}</div>
  else
    return <div>{props.person.fullName}</div>
});

// Action:
setTimeout(() => michel.nickName = "mweststrate", 5000)

React.render(React.createElement(profileView, { person: michel }), document.body);
```


### MobX的优势
MobX中的数据源是observable state，computed value和reaction都是根据数据源派生出的内容。与大多数响应式框架不同的是，MobX中做了两大改进。
1. MobX中的派生值（computed value和reaction）都是同步执行的，相比于异步执行，同步执行的优点一是容易定位错误，可以直接定位到导致异常的action，降低了debug的难度。二是可以保证观察者所观察的值永远是最新的，不过存在过时的数据，保证了界面和数据的一致性。同步执行使得程序有更加优秀的可预测性，极大方便了开发和调试，这一点在高复杂度的大型应用中尤为重要。

```
const user = observable({
  firstName: “Michel”,
  lastName: “Weststrate”,
  // MobX computed attribute
  fullName: computed(function() {
    return this.firstName + " " + this.lastName
  })
})
user.lastName = “Vaillant”
sendLetterToUser(user)
```
在上面的例子中，如果派生是异步运行的话，那么传入`sendLetterToUser`函数的将是旧值：`Weststrate`。而MobX中，取得的永远是最新的值`Vaillant`。这就是同步执行派生的效果。

2. MobX会自动优化依赖树，
MobX 中的依赖树会实时优化，当一个 observer 不再观察一个 observable state 或者 computed value 时，MobX就会及时的将 observable 从依赖树中移除，保证依赖树处在最小的状态。此外，所有的 computed value 都是惰性求值的，这就意味着有 observer 观察时，computed value 才会进行了求值，并且会对结果进行缓存。这样，有多处使用该 computed value 时，也只会进行一次计算。这两点保证了MobX拥有着不输于其他任何状态库的优秀性能。
下面，让我们看一个例子：
```
class Person {
  @observable firstName = "Michel";
  @observable lastName = "Weststrate";
  @observable nickName;
  
  @computed get fullName() {
    return this.firstName + " " + this.lastName;
  }
}

const michel = new Person();

// Reaction: log the profile info whenever it changes
autorun(() => console.log(person.nickName ? person.nickName : person.fullName));

// Example React component that observes state
const profileView = observer(props => {
  if (props.person.nickName)
    return <div>{props.person.nickName}</div>
  else
    return <div>{props.person.fullName}</div>
});

// Action:
setTimeout(() => michel.nickName = "mweststrate", 5000)

React.render(React.createElement(profileView, { person: michel }), document.body);
// This snippet is runnable in jsfiddle: https://jsfiddle.net/mweststrate/049r6jox/

```

当 nickName 还没有值时，nickName 和 fullName 都处于被观察状态，此时的 observer 的依赖树如下图所示：
![](https://cdn-images-1.medium.com/max/800/1*YPlKuWsPrVbhxUN7YhyTpg.png)

而当 action 被触发，nickName 的值被设置为 "mweststrate" 之后，fullName 不再处于被观察状态，此时的依赖树发生了变化：
![](https://cdn-images-1.medium.com/max/800/1*SXiDJ_mQ0ctEj2QEurLpqA.png)

依赖树已经被简化，fullName 现在处于 lazy 状态，不再进行计算求值。