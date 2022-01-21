![image](https://user-images.githubusercontent.com/5803001/43637212-f62daf14-9746-11e8-84e0-78247690b3c6.png)

[中文版本](./README.md) | [English Version](./README-en.md)

# [现代 Web 开发基础与工程实践](https://parg.co/b4n)

`Copyright © 2018 王下邀月熊`

Web 开发，入门易，深度难，分为初窥门径、登堂入室、融会贯通等阶段。本仓库存放 [ITCS 技术体系与知识图谱-Web 前端](https://parg.co/UIF)相关领域的 Web 开发基础与工程实践的相关博客、示例代码与开源项目、整理成的系列书籍等内容；目前为了更好地体系化阅读，笔者将所有的内容规整到了不同的系列文章 / 书籍中；代码等实践模板请参考 [fe-boilerplate](https://github.com/wx-chevalier/fe-boilerplate)。

![default](https://i.postimg.cc/y1QXgJ6f/image.png)

# Nav | 导航

如果您想快速检索，那么建议前往 [xCompass](https://wx-chevalier.github.io/home/#/search)/[alfred-sg](https://github.com/wx-chevalier/Soogle/tree/master/alfred-sg) 进行交互式地检索、查找需要的文章/链接/书籍/课程。

如果您对于 JavaScript 基础语法尚不完全了解，那么建议您首先浏览[现代 JavaScript 语法基础与工程实践](https://parg.co/UIj)或者 [JavaScript-CheatSheet](https://github.com/wx-chevalier/Awesome-CheatSheets/blob/master/ProgrammingLanguage/JavaScript/JavaScript-CheatSheet.md) 以了解基础的 JavaScript 语法及实践应用。

如果您想快速地了解 Web 开发实践，或者是想查阅某些清单，那么建议您前往 [Awesome-CheatSheets/Web]()；或者从 [Specials](./Specials) 开始阅读，它会包含 [Web 开发简史与变迁](./Specials/开发简史与变迁.md)，[数据流驱动的界面](./Specials/数据流驱动的界面.md)，[模块化与组件化](./Specials/模块化与组件化.md)，[工具化与工程化](./Specials/工具化与工程化.md)，[前后端分离与全栈架构](./Specials/前后端分离与全栈架构.md)，[微前端与大前端](./Specials/微前端与大前端.md)，[运行机制与性能优化](./Specials/运行机制与性能优化.md)，等内容。

接下来，您可以选择以下章节中感兴趣的模块进行深度阅读：

- [基础篇](./基础): 对于 HTML、CSS、DOM 等 Web 开发中涉及的基础知识与理念的总结介绍。

- [工程实践篇](./工程实践): 构建工具，测试，安全，WebAssembly。

- [架构优化篇](./架构优化篇): 组件化，状态管理，性能优化，PWA。

- [React 篇](./React)：近年来前端领域百花齐放，各种技术方案争妍斗艳，各领风骚。本书立足于其中的佼佼者 React，深入浅出的介绍 React、Webpack 、 ES6、Redux 、 MobX 等常见前端开发工具与开发库的用法，帮助初学者能够迅速成为一名合格前端工程师。而本书也不仅局限于工具使用的层面，探寻各种技术方案背后蕴含的设计思想与架构模式，从前端工程化的角度讨论前端开发者在进阶过程中需要掌握的工程实践、模块化与组件化、质量保障、性能优化等知识要点。最终帮助开发者在前端开发中能够因地制宜的指定合理方案，以尽可能快的速度实现可信赖的产品。

- [Vue 篇](./Vue)：本部分目前正逐步启动，笔者的初衷是希望能够保证本书章节与 [React 与前端工程化实践](./React)尽可能一致，从而更方便地去介绍不同技术栈下相通的设计理念；目前本书的目录只是拷贝自 [React 与前端工程化实践](./React)，未来笔者会逐步完善。

# Preface | 前言

这是一个最好的时代，也是最坏的时代，我们亲身经历着激动人心的变革，也往往会陷入选择的迷茫。随着浏览器版本的革新与硬件性能的提升，Web 前端开发进入了高歌猛进，日新月异的时代，无数的前端开发框架、技术体系争妍斗艳，让开发者们陷入困惑，乃至于无所适从。特别是随着现代 Web 前端框架(Angular、React、Vue.js)的出现，JavaScript、CSS、HTML 等语言特性的提升，工程化、跨平台、大前端等理论概念的提出，Web 前端开发的技术栈、社区也是不断丰富完善。

任何一个编程生态都会经历三个阶段，首先是原始时期，由于需要在语言与基础的 API 上进行扩充，这个阶段会催生大量的辅助工具。第二个阶段，随着做的东西的复杂化，需要更多的组织，会引入大量的设计模式啊，架构模式的概念，这个阶段会催生大量的框架。第三个阶段，随着需求的进一步复杂与团队的扩充，就进入了工程化的阶段，各类分层 MVC，MVP，MVVM 之类，可视化开发，自动化测试，团队协同系统；这个阶段会出现大量的小而美的库。

Web 前端开发可以追溯于 1991 年蒂姆·伯纳斯-李公开提及 HTML 描述，而后 1999 年 W3C 发布 HTML4 标准，这个阶段主要是 B/S 架构，没有所谓的前端开发概念，网页只不过是后端工程师的顺手之作，服务端渲染是主要的数据传递方式。接下来的几年间随着互联网的发展与 REST 等架构标准的提出，前后端分离与富客户端的概念日渐为人认同，我们需要在语言与基础的 API 上进行扩充，这个阶段出现了以 jQuery 为代表的一系列前端辅助工具。

2009 年以来，智能手机开发普及，移动端大浪潮势不可挡，SPA 单页应用的设计理念也大行其道，相关联的前端模块化、组件化、响应式开发、混合式开发等等技术需求甚为迫切。这个阶段催生了 Angular 1、Ionic 等一系列优秀的框架以及 AMD、CMD、UMD 与 RequireJS、SeaJS 等模块标准与加载工具，前端工程师也成为了专门的开发领域，拥有独立于后端的技术体系与架构模式。而近两年间随着 Web 应用复杂度的提升、团队人员的扩充、用户对于页面交互友好与性能优化的需求，我们需要更加优秀灵活的开发框架来协助我们更好的完成前端开发。这个阶段涌现出了很多关注点相对集中、设计理念更为优秀的框架，譬如 React、Vue.js、Angular 2 等组件框架允许我们以声明式编程来替代以 DOM 操作为核心的命令式编程，加快了组件的开发速度，并且增强了组件的可复用性与可组合性。而遵循函数式编程的 Redux 与借鉴了响应式编程理念的 MobX 都是非常不错的状态管理辅助框架，辅助开发者将业务逻辑与视图渲染剥离，更为合理地划分项目结构，更好地贯彻单一职责原则与提升代码的可维护性。在项目构建工具上，以 Grunt、Gulp 为代表的任务运行管理与以 Webpack、Rollup、JSPM 为代表的项目打包工具各领风骚，帮助开发者更好的搭建前端构建流程，自动化地进行预处理、异步加载、Polyfill、压缩等操作。

# 版权

![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg) ![](https://parg.co/bDm)

笔者所有文章遵循 [知识共享 署名 - 非商业性使用 - 禁止演绎 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh)，欢迎转载，尊重版权。如果觉得本系列对你有所帮助，欢迎给我家布丁买点狗粮(支付宝扫码)~

![](https://github.com/wx-chevalier/OSS/blob/master/2017/8/1/Buding.jpg?raw=true)
