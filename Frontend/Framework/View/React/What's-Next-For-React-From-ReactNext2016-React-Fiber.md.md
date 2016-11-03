> 周末参加GDG今年的活动时，听人安利Angular2的宏伟蓝图和规划，突然好奇React未来规划如何，之前还关注过[react-fiber-architecture](https://github.com/acdlite/react-fiber-architecture)。然后在YouTube上搜索到了[Andrew Clark: What's Next for React — ReactNext 2016](https://www.youtube.com/watch?v=aV1271hd9ew&feature=youtu.be)，本文即是翻译整理而来。

React Fiber是对于React核心算法的重写，可能会在未来某个版本中投入使用。不过Andrew Clark一直在提醒因为该特性还处于实验阶段，因此React团队并不能确定何时发布乃至是否能达到预期的目标。在2014年的一篇Twitter中，就有人@React核心团队希望引入多线程调和等特性。至此之后，React团队成员进行了很多关于列表中列举出的特性的实验与研究。

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/10/3/BBF0A612-3714-47CF-A1E4-2D4D5CF4E411.png)

而React Fiber则是目前最新的实验迭代得出的成果。

# Why Fiber:为啥要花大精力复写
## Scheduling:调度
调度的概念即在不同的场景、不同的上下文中我们需要为不同的任务设置不同的优先级，而React本身作为提供声明式组件支持的框架，使开发者不用再关注于具体的状态转化到UI显示的流程。React为我们提供了控制如何去更改UI状态以及何时更改UI状态的接口，其遵循的是Push方式去更改页面状态，而React Fiber即是希望寻找更优的算法来决定调度策略。目前来说，我们在界面的开发中往往会碰到如下几种需要进行状态更新的情况:
- 用户事件:Clicks,Input Change
- 外部订阅的状态变更:Redux,MobX,Relay
- Animations:Transitions,Gestures

目前的React核心算法中并没有对这几种情况进行想起的区分，而是统一对待。而从用户体验的角度来说，对于状态管理中外部状态变化引发的内部状态变化可能对于用户体验影响不大， 毕竟数据加载本身就存在延迟。而对于动画而言，一旦有所延迟则会引发掉帧，从而大大影响用户体验。
> Animations are more important than typical updates


## ListView
上文提及，Scheduling允许我们为不同的任务定义不同的执行优先级。这里以某个超长列表为例:
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/10/3/548FE030-4548-4359-8EC0-6A626DAD2177.png)
完整的列表包含一千多行数据，现在我们不管对于屏幕内还是屏幕外的数据都会进行相同的操作，从而导致了大量的无意义的损耗。因此理想的情况我们是希望在用户停止滚动之前不进行其他额外的操作并且不对屏幕之外的列表项进行渲染。从调度的角度来说，我们就希望对屏幕外的列表项设置较低的优先级，而对屏幕内的列表项设置较高的渲染优先级。

# How it Works:工作原理
## Concurrency
并发性是Fiber的核心精髓，首先需要明了的是并发与并行的区别。React的渲染一直是同步进行的，那么假设当我们需要去渲染某个动画帧的时候（一般来说完整的动画需要每秒60帧，大概16.5毫秒每帧），渲染线程忙于渲染一些低优先级的组件，譬如那一些离屏的组件时候，我们希望的场景是渲染线程能够暂停当前的动作去渲染动画帧，渲染完毕后继续刚才的工作。其流程概述如下:
- 中断当前低优先级的工作
- 完成高优先级工作
- 继续刚才未完成的工作

此时的一个核心问题就是如何中断现有的渲染工作，目前React的渲染操作可以为抽象为`v = f(d)`这样一个函数调用，那么问题就被转化为了如何去中断该函数调用。ES6中内置有Generator对象是个不错的考虑，现在也有很多的框架利用Generator去实现Concurrency Primitive。不过Clark在这里介绍的是`debugger;`表达式，Debugger表达式能够给程序打断点，就像这样:
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/11/1/62CB114B-179B-4D00-96F0-BDFAFF05F14F.png)
上图描述的简单的对每个栈帧打断点的过程就是现在Fiber中断渲染过程然后恢复的机制，其流程概述为:
- 中断当前渲染的调用栈
- 将当前的调用栈暂存
- 执行某些拥有独立调用栈的高优先级的任务
- 返回原始调用栈并且恢复其执行

到这里我们可以将Fiber定义为Reimplementation Of The Stack，A Fiber is a Virtual Stack Frame。










## Fiber
Fiber 更多的是语言中的某个抽象，用于实现某些语言中复杂的特性。在下表中就是将Stack Frame与Fiber中的名词进行了对比:
![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/10/3/EBD6DD22-D654-4B14-9D8E-00BCC8924856.png)
除了上表列举的Fiber的基本性质，其还具备如下属性:
- 优先级
- 可缓存的输入（Props）
- Key，用于调和时使用

基于Fiber就可以将原本的渲染工作切分到可并发的细小单元，然后按照优先级依次执行。下一步我们就是需要解决应该在何时暂停当前工作以及何时恢复原调用栈。目前浏览器为我们提供了两个用于动画渲染的API:
- requestAnimationFrame(cb):定期调用动画帧，如果你想做逐帧动画的时候，你应该用这个方法。这就要求你的动画函数执行会先于浏览器重绘动作。通常来说，被调用的频率是每秒60次，但是一般会遵循W3C标准规定的频率。如果是后台标签页面，重绘频率则会大大降低。
- requestIdleCallback(cb):在浏览器空闲时调用回调函数。

![](https://coding.net/u/hoteam/p/Cache/git/raw/master/2016/11/1/63BCC0A6-A161-4178-A4B9-31DC46644FD3.png)

上图就是展示了Fiber的工作流，目前有40个单位的低优先级工作，如果用上面的连续性渲染，我们并不能在渲染过程中插入动画帧。而在下面的可中断恢复的方案中，我们可以将动作拆分为四个块，然后在块之间插入高级别的动画帧。



# What it can do:有啥作用
- Integrated Layout
- 在render函数中返回多个元素
- 更加清晰的代码库




















