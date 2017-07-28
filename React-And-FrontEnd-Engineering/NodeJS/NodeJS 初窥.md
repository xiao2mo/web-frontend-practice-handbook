# NodeJS 初窥
## Reference
- [What is Node.js? An explanation too late](https://lethalbrains.com/what-is-node-js-an-explanation-too-late-477c10778dea#.5daatualo)
- [The Art of Node An introduction to Node.js](https://github.com/maxogden/art-of-node#modules)

# 认识 NodeJS
## NodeJS 的前世今生
目前来看，绝大部分的 Web 应用都采用的 C/S 架构，在 C 端也就是浏览器端，JavaScript 占据着绝对的霸主地位。而在 S 端，也就是服务器端，则是多种开发语言同台竞技。客户端开发语言可以粗略的分为两类，一类是诸如 PHP 的动态类型语言，简单易上手，开发效率高，但是性能不甚理想。另一类是诸如 Java、C++ 之类的静态类型语言，性能优秀，但是复杂度高，开发效率不尽如人意。在这样的背景下，为 Node.js 的出现提供了土壤，

2009年，Ryan Dahl 发布了 Node.js 的第一个版本，在飞速发展了数年之后，Node.js 已经拥有了一个庞大的开发者社区和繁荣的生态，在服务端开发已经占据了一席之地，那么，Node.js 到底解决了什么样的痛点呢？

首先，让我们先了解一下 Node.js 到底是什么。众所周知，JavaScript 是一门脚本语言，需要 JavaScript 引擎来解释执行。而目前性能最强大的 JavaScript 引擎则是 Google Chrome 浏览器中集成的 V8引擎。简单来说，Node.js 就是一个内置了 V8 引擎的转换程序，为 JavaScript 代码提供了运行时环境，可以将 JavaScript 代码转换成机器码提供给机器执行。

了解了 Node.js 究竟是什么，那么，上面的问题：Node.js 解决了什么样的痛点，就可以理解为：为什么要用 JavaScript 进行服务端开发。

在回答这个问题之前，我们先简单总结一下 JavaScript 的编程模型和语言特点：JavaScript 是一门事件驱动的，采用单线程，非阻塞 I/O 的编程语言。这些特点非常适合开发服务端这种基于 I/O 的业务。同时，单线程模型可以规避掉多线程并发编程的复杂度，提高开发效率，JavaScript 的这些语言层面的特点正好解决了服务端开发效率方面的问题。
再来说性能，服务端对于性能有着很高的要求，以往的 JavaScript 引擎的性能无法满足服务端运行的要求，而 V8 引擎的出现，相比于以往的 JavaScript 引擎，性能得到了大幅度提升，为 JavaScript 进军服务端扫清了最后一重障碍。

基于以上两点，Node.js 正是实现了开发效率和性能之间的良好平衡，同时依托于数量庞大的 JavaScript 开发者和活跃的社区，才能够最终在服务端占据了自己的一席之地。

作为 JavaScript 开发者，千万不要轻易的认为有了 Node.js 将会一统全栈打败包括 Java 在内的其它语言，这是一种很幼稚的想法。首先，在一个大型的系统架构中，整个系统会被拆分成很多很小的业务系统，这些子系统往往通过消息队列（如 RabbitMQ、Kafka 等等）相互连接起来。也许在小型 Web 站点中，你从来没用过这些。但相信我，在但凡稍微大一些的业务系统中，都是这么干的。这些消息队列服务存在的意义就是将各个子系统解耦。这样一来，你可以在前端部分应用 Node.js 进行快速开发，在业务处理部分使用 Java 来完成。数据分析系统却可以使用 Python/Scala （例如基于 Spark）实现。大型业务系统的架构者们都是些经验丰富的老手，他们知道每个语言/系统的利弊，也知道世界总在变，今天是 Node.js、明天也许就是另一个新秀，因此在整个业务系统中，你要做的根本不是“统一”，反而是“分离”。这样的设计才能够预留出扩展和变更的机会。其次，Node.js 也不是完美不缺的，下面我们就来谈谈它的潜在缺陷。

## NodeJS 的潜在缺陷探讨
前面说到，Node.js 的发展更多的是在开发效率和性能直线找到了一个平衡点，而不是因为某一方面的突出表现。因此，在不断深入的过程中，它的不足之处也会不断显现出来。
- 性能 - 前面说到 V8 引擎的优异性能把 JavaScript 带进了服务端开发的大门，但是，V8 的优异性能是相较于以往的 JavaScript 引擎和 其他诸如 PHP 等其他脚本语言而言的。一旦和一些高度完善的 VM 例如 JVM 相比，差距甚远。在服务器领域，特别是拥有众多 CPU 和大量内存的环境下，Java 的 VM 几乎是你能在地球上找到的最好的 VM。而 V8 既不能榨干多 CPU 的性能，也不能将内存充分利用。你唯一能做的事情就是开很多个 Node.js 实例来缓解，但这样做又会带来新的问题。系统规模越大，性能问题也就越明显。

- 健壮度 - JavaScript 作为一门动态类型语言，使用的是动态类型推导。因此，很多错误只有在运行时才能够发现。这种情况在客户端可能算不上太严重的问题，但是在服务端，对于稳定性和代码的健壮性有着极高的要求，一旦出现错误，导致服务器宕机，就会造成不可估量的损失。因此，类型检查的缺失虽然提高了灵活度，但是也带来了更高的风险。近年来，也出现了 FLow 和 TypeScript 之类的类型解决方案，但是又带来了额外的学习成本。

# 模块化驱动开发
Node.js 采用了 CommonJS 规范来实现自己的模块系统。根据 CommonJS 规范，每个文件都是一个模块，通过 `exports` 对象对外暴露接口，通过 `require()` 方法引入其他模块：
```
// a.js

let nunmber = 1;

const add = () => number++;

// 模块输出
exports.number = number;
```
```
// index.js

// 引入模块 a
var moduleA = require('a');

console.log(moduleA.number);  // 1

moduleA.add();

console.log(moduleA.number);  // 2
```

每个模块都有独立的作用域，不会污染全局作用域。通过 Node.js 内置的包管理器 NPM，可以轻松管理和使用 Node.js 生态系统中数十万个模块。

Node.js 内置了一些核心模块提供给开发者，例如文件系统相关的模块 `fs`，网路相关的模块，例如 `http`、`net`（TCP）、`dgram`（UDP）等。

# 回调
如果你熟悉 JavaScript 的话，肯定会知道 JavaScript 里的事件与回调。回调是最基本的处理异步编程的方式，更高级的方式还有 Promise 和 async/await。回调在 Node.js 中也占据着重要的地位，基本上所有的 I/O 相关的方法都是采用回调的方式来调用，例如。我们想读取一个文件：
```
var fs = require('fs') // require is a special function provided by node
var myNumber = undefined // we don't know what the number is yet since it is stored in a file

function addOne() {
  fs.readFile('number.txt', function doneReading(err, fileContents) {
    myNumber = parseInt(fileContents)
    myNumber++
  })
}

addOne()

console.log(myNumber) // logs out undefined -- this line gets run before readFile is done
```
在上面的例子中，`fs.readFile()` 就是一个异步方法，`doneReading` 函数作为一个回调，在获得文件读取结果之后才会被触发。因此，打印出的 `myNumber` 值仍然是 `undefined`。
为什么要采取回调的方式呢，或者说为什么要采取异步的方式呢？因此相比较于 V8 执行 JavaScript 代码的速度，读取磁盘文件的速度实在是太慢了，二者的速度相差数个数量级。如果一直在等待读取完成的话，代码的执行速度会受到非常大的影响。

回调作为最原始的异步处理方式，也有自身的缺陷，就是著名的"回调地狱"。层层叠叠的回调不但大大降低了代码的可读性，也在开发和维护带来了额外的困难。因此，才催生了 Promise 和 async/await 这些更加简洁优雅的解决方案。例如，同样的 `readFile()` 方法：
```
// 使用 Promise
readFile('number.txt').then(fileContents => {}).catch(e => {});

// 使用 async/await
var fileContents = await readFile('number.txt');
```
可以看出来，这些方案都更加接近于同步的写法，无论是开发和维护都更加的便捷高效。

# 包管理器 - NPM
NPM（Node Package Manager）是 Node.js 中内置的包管理器。包管理器存在的意义是什么呢？
- 方便的共享代码 - Node.js 社区非常的繁荣和活跃，诞生了许多实用方便的模块。以往为了使用第三方代码需要去寻找其官方网站然后自行加载，手动引入项目。现在虽然有了 GitHub 之类的代码托管网站可以分享代码，但是使用起来并不够方便。而有了 NPM 之后，所有的模块都被集中在了 NPM 的仓库中，只需要使用 `npm install moduleName` 命令就能把想要的模块安装到指定的 `node_modules` 文件夹中。同时，每个人都可以向 NPM 的仓库中发布自己的代码，贡献自己的智慧。所以 NPM 的出现不仅方便了程序员之间共享代码，也使得 JavaScript 社区更加的繁荣昌盛。
- 统一管理依赖 - 大型项目中往往会使用到许多第三方代码。如果没有包管理器的话，这些第三方代码只能通过人工去管理，不但低效，而且十分容易出错。有了 NPM 之后，每个项目的根目录下都会有一个 `package.json` 文件，其中详细记录了项目使用的第三方模块及其版本信息，统一管理依赖，减少错误的出现。
- 解耦依赖 - 依赖的代码往往占据了很大的体积，甚至远远超过业务代码的体积。如果没有包管理器，共享项目的时候就需要带上所有的依赖代码，不仅浪费存储空间，也浪费了传输的时间。而有了 NPM 之后，项目的所有依赖信息都记录在了 `package.json` 文件中，在共享项目的时候就不再需要带上所依赖的代码，只需要共享出 `package.json` 文件和业务代码。其他人在项目目录下运行 `npm install`命令，就可以安装所有的依赖，既省时又省力。

NPM 的优点还有很多，在实现开发中可以慢慢体会。

之所以要介绍 Node.js 是因为许多的前端工具都运行在 Node.js 中，例如打包工具 Webpack，测试工具 Mocha 等等。想要用好这些工具，必须要对 Node.js 有一定的了解。比如说 Webpack dev server 是 Webpack 的重要功能之一，按照官方文档配置是可以跑起来。但是在实际使用中往往需要自定义服务器来提供需要的功能。这时候，会用 Node.js 开发服务端就派上了用场。再如 React 的服务端渲染，也需要一定的服务端开发能力。所以，在接下来的内容中，我们会学习一些基础的服务端开发。





