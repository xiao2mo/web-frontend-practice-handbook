原文地址：[这里](https://medium.freecodecamp.com/cracking-the-front-end-interview-9a34cd46237#.pjsn9bv8k)

有时候前端的技术性面试还是很麻烦的，毕竟知识点那么多，框架迭代那么快。你不仅仅要对计算机科学基础有一个坚实的底子，还需要理解啥Web性能、构建系统以及CSS引擎等等。现在确实也有不少的相关面试的资源，（译者推荐[Front-end-Developer-Interview-Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions):H5BP出品的一系列的前端问题，不过感觉有点杂而老），不过其中比较全面的还是不多，因此我在这嘎达列个提纲，希望能对你下次面试有所帮助。

> 有些链接被墙，请自备梯子

#### 面试之前

在面试之前，你要先问问你这个面试的形式。有些面试时直接在白板上面画画圈圈，而有些呢会在一个在线的编辑器里面，就像CoderPad这样的，让你现场写一些代码，提前了解你面试的环境还是非常重要的。除此之外，还需要了解下你这次面试的主题，因为有些公司除了会问你一些前端相关的问题之外，还会问你一些搜搜、排序算法相关的问题。

### 前端概念

HTML、CSS、JavaScript以及JavaScript设计模式都是面试中的一些关键的概念，保证列表中的每一项都了熟于心。

![](https://cdn-images-1.medium.com/max/1600/1*Cx4fcxgCFGgI3TyL43Ed1g.png)

HTML与CSS就像前端开发中的面包和黄油，在面试的时候也会问到HTML与CSS很多细节方面，有时候也会让你现场写一些布局啊啥的。一些基本的概念列举如下：

- [CSS animations](https://css-tricks.com/almanac/properties/a/animation/)
- [CSS sprites](https://css-tricks.com/css-sprites/)
- [Pseudo classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)
- [Grid systems](http://www.sitepoint.com/understanding-css-grid-systems/)
- [Semantic markup](http://www.hongkiat.com/blog/html-5-semantics/)

除了这些概念之外，知道一些CSS的预处理器譬如 [SASS](http://sass-lang.com/guide) 或者[LESS](http://lesscss.org/) 以及他们的优势。另外知道一些CSS命名空间方面的知识，譬如[BEM and OOCSS](http://clubmate.fi/oocss-acss-bem-smacss-what-are-they-what-should-i-use/)也是极有用的。另一个关于CSS方面的要点，就是对于CSS的最佳实践，这嘎达推荐一个Medium提供的 [实践指南](https://medium.com/@fat/mediums-css-is-actually-pretty-fucking-good-b8e2a6c78b06#.7i1ey8j4g) ，包含了Medium如何更新迭代他们的最新框架。

早前我在文中就提醒过可能一些面试官会让你用HTML与CSS重构一些布局，譬如在CodePen中的一些实践，也可以参考[Dribbble](https://dribbble.com/) 中的一些实例。最后，作为一个前端工程师，我们常常会在编辑器里面修改一些代码然后在浏览器里面查看最终的效果。不过在面试的时候往往不会有这种权利，所以你在准备面试的时候一定要尽可能地尝试不用看显示效果就能较好地调试代码。

------

![](https://cdn-images-1.medium.com/max/1600/1*qyu6vCvAfXXG_M88izPm9Q.png)

如果说HTML与CSS是前端开发中的面包与黄油，那么JavaScript就是那边餐刀。一般而言在你的整个面试过程中面试官会花费很多的时间问你有关JavaScript的知识，这些问题可能攘括以下方面：

- [Prototypal inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

- [Scoping](https://spin.atomicobject.com/2014/10/20/javascript-scope-closures/)

- [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

- [The event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

- [Event bubbling](http://javascript.info/tutorial/bubbling-and-capturing)

- [Apply, call, and bind](http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/)

- [Callbacks and promises](https://www.quora.com/Whats-the-difference-between-a-promise-and-a-callback-in-Javascript)

- [Variable and function hoisting](http://adripofjavascript.com/blog/drips/variable-and-function-hoisting)

- [Currying](http://www.sitepoint.com/currying-in-functional-javascript/)

当你面对一个JavaScript问题时，搞明白你这个问题到底归属于哪个概念会有助于你更快地寻找到某个正确的解决方案。你可以在 [这嘎达](https://www.toptal.com/javascript/interview-questions),[这个嘎达](https://www.codementor.io/javascript/tutorial/21-essential-javascript-tech-interview-practice-questions-answers), 以及 [这嘎达](http://career.guru99.com/top-85-javascript-interview-questions/)测试下你的JavaScript知识。

------

![](https://cdn-images-1.medium.com/max/1600/1*ZqpnG0cUVPRicofbwL8MHA.png)

设计模式能有助于你以可复用的方案来解决常见的问题，这里列举了几个常见的设计模式：

- [Decorator](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#decoratorpatternjavascript)
- [Factory](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript)
- [Singleton](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript)
- [Revealing module](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript)
- [Facade](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#facadepatternjavascript)
- [Observer](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript)
- [MVC](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvc), [MVP](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvp), [MVVM](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvvm)

除了这些常见的JavaScript设计模式之外，你还要对常见的JavaScript的框架熟悉。当然，这并不意味着你就要去学习一个新的框架，不过你要能够理解为虾米那些前端团队会去使用这些框架。另外，如果你要去面试的团队使用的是譬如React+Flux或者Angular这样的流行框架，你也要提前看下他们的文档，了解下他们的架构。

## Computer Science

某些公司会在招聘前端开发者之前招聘些软件工程师，这也就意味着这些公司会期待面试者拥有一些譬如软件设计原则、可扩展的代码架构以及测试这些方面的知识。不过你的面试官一般都会先提醒你要了解下数据结构啊、算法啊这些方面的知识，否则的话你可以暂时忽略这个部分。即使你并不是计算机科班出身，也不需要紧张，大部分这里的概念还是很好理解的。

![](https://cdn-images-1.medium.com/max/1600/1*xelh9mMQzhZbhb85uWtHNA.png)

这里有些常见的数据结构应该常常存在于您脑子里。不要老纸上谈兵，找个地方去实践他们。如果你并不是很熟悉单元测试，那可以选个测试框架，譬如 [Mocha](https://mochajs.org/) 来测试你的数据结构算法。

- Linked lists
- Hashtables
- Stacks
- Queues
- Trees (binary trees and heaps)
- Graphs



Note: 对于图方面的知识而言，你需要了解怎么实现深度优先于广度优先遍历。在学习数据结构的时候，可以参考[SanFoundry](http://www.sanfoundry.com/java-programming-examples-data-structures/)。虽然这里的代码都是Java作为例子，不过把它们改写成JavaScript还是很轻松的。

------

![](https://cdn-images-1.medium.com/max/1600/1*4Y9vSWE5yuMjmvx4gv0mRQ.png)

在你觉得你的数据结构已经很有信心之后，你可以来了解基本的排序算法。可以参考以下的列表，首先也要了解下基本的算法时间和空间复杂度的概念：[time and space complexity](http://bigocheatsheet.com/)。

- Binary search
- Bubble sort
- Insertion sort
- Merge sort
- Quick sort
- Selection sort

在了解了数据结构与算法之后，可以在[Leetcode](https://leetcode.com/) 上进行实践，也可以看看 [一些技术性的JavaScript问题](https://www.interviewcake.com/javascript-interview-questions)。

## Wrapping it up

祝大家好运~

------